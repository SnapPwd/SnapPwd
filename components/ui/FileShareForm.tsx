"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Loader2, UploadCloud, Clock, File } from "lucide-react";
import { encryptFile } from "@/libs/client-file-crypto";
import { generateEncryptionKey } from "@/libs/client-crypto";
import { FileMetadata } from "@/libs/snappwd";
import { Buffer } from "buffer";
import { EXPIRATION_OPTIONS, ExpirationValue, EXPIRATION_SECONDS, isCustomExpiration } from "@/libs/constants";

export default function FileShareForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [selectedExpiration, setSelectedExpiration] = useState<ExpirationValue>("one_hour");
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
    setShareLink(null);
  };

  const handleShareFile = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to share.");
      return;
    }

    setLoading(true);
    setShareLink(null);

    try {
      // Determine expiration in seconds
      let expiration: number;
      if (isCustomExpiration(selectedExpiration)) {
         // Fallback for custom if needed, though for now we can default to 1 hour or handle differently
         // Since UI doesn't expose custom date picker yet for files, force 1 hour or error?
         // Let's stick to preset options for parity with current SecretForm behavior in simple mode
         expiration = 3600; 
      } else {
         expiration = EXPIRATION_SECONDS[selectedExpiration];
      }

      const encryptionKey = generateEncryptionKey();
      const { iv, encryptedData } = await encryptFile(selectedFile, encryptionKey);

      const ENCRYPTED_SIZE_LIMIT_BYTES = 2 * 1024 * 1024; // 2 MB
      if (encryptedData.byteLength > ENCRYPTED_SIZE_LIMIT_BYTES) {
        toast.error("Encrypted file size exceeds the 2MB limit. Please choose a smaller file.");
        setLoading(false);
        return;
      }

      const ivBase64 = Buffer.from(iv).toString('base64');

      const fileMetadata: FileMetadata = {
        originalFilename: selectedFile.name,
        contentType: selectedFile.type || "application/octet-stream",
        iv: ivBase64,
      };

      const response = await fetch("/api/upload-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metadata: fileMetadata,
          encryptedData: Buffer.from(encryptedData).toString("base64"),
          expiration,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to store encrypted file.");
      }

      const { fileId } = await response.json();
      const newShareLink = `${window.location.origin}/file/${fileId}#${encryptionKey}`;
      setShareLink(newShareLink);
      toast.success("File shared securely!");
    } catch (error) {
      console.error("Error sharing file:", error);
      toast.error("Failed to share file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      toast.info("Share link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8">
      {/* Left side - File Input */}
      <div className="flex-1 space-y-4">
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <input
            id="file"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-primary/10 rounded-full text-primary">
              <UploadCloud className="h-8 w-8" />
            </div>
            {selectedFile ? (
              <div className="space-y-1">
                <p className="text-lg font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">{Math.round(selectedFile.size / 1024)} KB</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-lg font-medium text-foreground">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">Max file size 2MB (Encrypted locally)</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side - Settings & Action */}
      <div className="flex flex-col gap-6 w-full lg:w-64">
        <div className="flex flex-col gap-3">
          <label htmlFor="file-expiration" className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Link Expiration
          </label>
          <select
            className="border border-input rounded-lg p-3 w-full bg-background text-foreground hover:border-ring focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none text-sm font-medium cursor-pointer"
            id="file-expiration"
            value={selectedExpiration}
            onChange={(e) => setSelectedExpiration(e.target.value as ExpirationValue)}
          >
            {EXPIRATION_OPTIONS.filter(o => o.value !== 'custom').map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your file will be permanently deleted after this time period
          </p>
        </div>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 text-base h-12"
          onClick={handleShareFile}
          disabled={!selectedFile || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Encrypting...
            </>
          ) : (
            <>
              <File className="mr-2 h-5 w-5" />
              Share File
            </>
          )}
        </Button>

        {/* Security features badge */}
        <div className="flex flex-col gap-2 p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
            <span>One-time access only</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
            <span>Auto-expires after time limit</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </div>

      {shareLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card p-6 rounded-xl shadow-2xl max-w-md w-full border border-border space-y-4">
            <h3 className="text-xl font-bold text-center">File Ready to Share!</h3>
            <div className="flex items-center space-x-2">
              <Input type="text" value={shareLink} readOnly className="font-mono text-sm" />
              <Button size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setShareLink(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
