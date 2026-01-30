"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Added useRouter
import { Buffer } from "buffer";
import { decryptFile } from "@/libs/client-file-crypto";
import { FileMetadata } from "@/libs/snappwd";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileWarning } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function FileViewPage() {
  const params = useParams();
  const router = useRouter(); // Initialize useRouter
  const fileId = params.fileId as string;
  const [decryptedFileBlob, setDecryptedFileBlob] = useState<Blob | null>(null);
  const [metadata, setMetadata] = useState<FileMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processFile = async () => {
      setLoading(true);
      setError(null);
      setDecryptedFileBlob(null);
      setMetadata(null);

      if (!fileId) {
        setError("Invalid file ID.");
        setLoading(false);
        return;
      }

      // Extract encryption key from URL hash fragment
      const encryptionKey = window.location.hash.substring(1);
      if (!encryptionKey) {
        setError("Encryption key not found in URL. The link may be incomplete.");
        setLoading(false);
        return;
      }

      try {
        // Fetch encrypted file data and metadata from the API route
        const response = await fetch(`/api/get-file?fileId=${fileId}`);

        // The 404 for 'File not found or already accessed' will now correctly happen on second visit
        if (!response.ok) {
          if (response.status === 404) {
            setError("File not found or already accessed.");
          } else {
            throw new Error("Failed to fetch encrypted file data.");
          }
          setLoading(false);
          return;
        }

        const { metadata: fetchedMetadata, encryptedData: base64EncryptedData } = await response.json();

        // Convert Base64 encrypted data back to ArrayBuffer
        const encryptedDataBuffer = Buffer.from(base64EncryptedData, "base64");
        const encryptedFileArrayBuffer = encryptedDataBuffer.buffer.slice(
          encryptedDataBuffer.byteOffset,
          encryptedDataBuffer.byteOffset + encryptedDataBuffer.byteLength
        );

        // Convert base64 IV back to Uint8Array
        const iv = new Uint8Array(atob(fetchedMetadata.iv).split("").map(char => char.charCodeAt(0)));

        // Decrypt the file
        const decryptedBlob = await decryptFile(
          iv,
          encryptedFileArrayBuffer,
          encryptionKey,
          fetchedMetadata.originalFilename,
          fetchedMetadata.contentType
        );

        setDecryptedFileBlob(decryptedBlob);
        setMetadata(fetchedMetadata);
        toast.success("File decrypted successfully! Click Download to retrieve.");
      } catch (err) {
        console.error("Error processing file:", err);
        setError("Failed to decrypt file. The key might be incorrect or data corrupted.");
        toast.error("Decryption failed.");
      } finally {
        setLoading(false);
      }
    };

    processFile();
  }, [fileId]);

  const handleDownload = async () => { // Made async
    if (decryptedFileBlob && metadata) {
      const url = URL.createObjectURL(decryptedFileBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = metadata.originalFilename || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // --- NEW: Call API to delete file after download initiates ---
      try {
        const response = await fetch("/api/delete-file", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileId }),
        });

        if (!response.ok) {
          console.error("Failed to delete file after download.");
          toast.error("Error: File may not have been deleted from server.");
        } else {
          toast.info("File downloaded and deleted from server.");
          router.push('/'); // Redirect to home after successful download and deletion
        }
      } catch (deleteError) {
        console.error("Error deleting file after download:", deleteError);
        toast.error("Error: Failed to confirm file deletion from server.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border border-border text-center space-y-6">
        {loading && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-lg text-muted-foreground">Processing file...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center">
            <FileWarning className="h-10 w-10 text-destructive mb-4" />
            <p className="text-lg font-semibold text-destructive mb-2">Error:</p>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        )}

        {decryptedFileBlob && metadata && !loading && !error && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-card-foreground">File Ready!</h2>
            <p className="text-lg text-muted-foreground">
              Decrypted: <span className="font-medium text-primary">{metadata.originalFilename}</span>
            </p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download File
            </Button>
            <Link href="/">
              <Button variant="outline" className="mt-4 w-full">Share Another Secret</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
