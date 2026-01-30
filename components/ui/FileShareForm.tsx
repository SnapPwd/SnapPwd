"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Loader2, UploadCloud } from "lucide-react";
import { encryptFile } from "@/libs/client-file-crypto";
import { generateEncryptionKey } from "@/libs/client-crypto";
import { FileMetadata } from "@/libs/snappwd"; // Import FileMetadata interface
import { Buffer } from "buffer";

export default function FileShareForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [expiration, setExpiration] = useState<number>(3600); // Default to 1 hour
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
    setShareLink(null); // Reset link on new file selection
  };

  const handleShareFile = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to share.");
      return;
    }

    setLoading(true);
    setShareLink(null);

    try {
      const encryptionKey = generateEncryptionKey();
      const { iv, encryptedData } = await encryptFile(selectedFile, encryptionKey);

      const ENCRYPTED_SIZE_LIMIT_BYTES = 2 * 1024 * 1024; // 2 MB
      if (encryptedData.byteLength > ENCRYPTED_SIZE_LIMIT_BYTES) {
        toast.error("Encrypted file size exceeds the 2MB limit. Please choose a smaller file.");
        setLoading(false);
        return;
      }

      // Convert IV to Base64 for transport
      const ivBase64 = Buffer.from(iv).toString('base64');

      const fileMetadata: FileMetadata = {
        originalFilename: selectedFile.name,
        contentType: selectedFile.type || "application/octet-stream",
        iv: ivBase64,
      };

      // Send encrypted data and metadata to API route
      const response = await fetch("/api/upload-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadata: fileMetadata,
          encryptedData: Buffer.from(encryptedData).toString("base64"), // Convert ArrayBuffer to Base64
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

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    return `${Math.floor(seconds / 86400)} days`;
  };

  return (
    <div className="space-y-6">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="file">Select File</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="file"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="flex-1"
          />
          {selectedFile && (
            <span className="text-muted-foreground text-sm">
              {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="expiration">
          Link Expiration: {formatTime(expiration)}
        </Label>
        <Slider
          id="expiration"
          min={60} // 1 minute
          max={604800} // 7 days
          step={60} // 1 minute increments
          value={[expiration]}
          onValueChange={(val) => setExpiration(val[0])}
          className="w-full"
        />
      </div>

      <Button
        onClick={handleShareFile}
        disabled={!selectedFile || loading}
        className="w-full"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <UploadCloud className="mr-2 h-4 w-4" />
        )}
        Share File
      </Button>

      {shareLink && (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" value={shareLink} readOnly />
          <Button type="button" size="sm" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
