"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Buffer } from "buffer";
import { decryptFile } from "@/libs/client-file-crypto";
import { FileMetadata } from "@/libs/snappwd";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileWarning, AlertTriangle, Eye, Shield, Lock, File } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function FileViewPage() {
  const params = useParams();
  const router = useRouter();
  const fileId = params.fileId as string;
  const [decryptedFileBlob, setDecryptedFileBlob] = useState<Blob | null>(null);
  const [metadata, setMetadata] = useState<FileMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // Initial fetch and decryption
  const fetchAndDecrypt = async () => {
    setLoading(true);
    setError(null);

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
      // Don't auto-reveal, wait for user action
      setLoading(false);
    } catch (err) {
      console.error("Error processing file:", err);
      setError("Failed to decrypt file. The key might be incorrect or data corrupted.");
      toast.error("Decryption failed.");
      setLoading(false);
    }
  };

  // Run on mount only once? No, useEffect runs on mount.
  // BUT the current implementation fetches immediately on mount.
  // We want to fetch immediately but NOT show download button immediately?
  // Actually, the server deletes on access (redis.getDel).
  // So if we fetch in useEffect, the file is GONE from server.
  // We MUST fetch in useEffect to decrypt it.
  // So the file is already burned from server when the component loads.
  // This means the warning "You can only download once" is essentially "You must download NOW because it's already gone from server".
  
  // Wait, if redis.getDel is used in the API, the moment we call fetch in useEffect, the file is deleted.
  // So if the user closes the tab without downloading, it's lost forever.
  
  // To implement "Reveal Secret" style flow where the user confirms BEFORE burning:
  // We need to delay the fetch until the user clicks "Reveal".
  
  // REFACTOR:
  // 1. Remove fetch from useEffect.
  // 2. Add "Reveal File" button that triggers fetchAndDecrypt.
  // 3. Show warning before Reveal.

  const handleReveal = () => {
    fetchAndDecrypt();
    setIsRevealed(true);
  };

  const handleDownload = async () => {
    if (decryptedFileBlob && metadata) {
      const url = URL.createObjectURL(decryptedFileBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = metadata.originalFilename || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Download started!");
      
      // Note: The file is already deleted from Redis by the get-file API call.
      // We don't need a separate delete call, but we can redirect or show success state.
    }
  };

  // Initial state: waiting for user to click reveal
  // Loading state: decrypting
  // Success state: show download button
  
  // But wait, if we don't fetch metadata first, we don't know the filename or size to show "You are about to download X".
  // The current API doesn't separate metadata fetch from data fetch (get-file returns both and deletes).
  // So we can't show "File: report.pdf" before burning it.
  // We just show a generic "A secure file is waiting for you".

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border border-border text-center space-y-6">
        
        {/* State 1: Initial Reveal Screen (File not fetched yet) */}
        {!isRevealed && !loading && !error && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <Lock className="h-12 w-12" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Reveal Secure File</h1>
              <p className="text-muted-foreground">
                A secure file has been shared with you.
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-left">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-yellow-800 dark:text-yellow-500 text-sm">One-time download only</p>
                  <p className="text-xs text-yellow-700/80 dark:text-yellow-500/80 leading-relaxed">
                    Once you click reveal, the file will be permanently deleted from our servers. You must download it immediately.
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={handleReveal} size="lg" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              Reveal File
            </Button>
          </div>
        )}

        {/* State 2: Loading / Decrypting */}
        {isRevealed && loading && (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-lg text-muted-foreground">Decrypting securely...</p>
          </div>
        )}

        {/* State 3: Error */}
        {error && (
          <div className="flex flex-col items-center">
            <FileWarning className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-bold text-destructive mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-6 text-sm">{error}</p>
            <Link href="/">
              <Button variant="outline">Return Home</Button>
            </Link>
          </div>
        )}

        {/* State 4: Success / Download Ready */}
        {decryptedFileBlob && metadata && !loading && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-green-500/10 rounded-full text-green-600">
                <File className="h-12 w-12" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-card-foreground">File Decrypted</h2>
              <p className="text-lg font-medium text-primary break-all">
                {metadata.originalFilename}
              </p>
              <p className="text-xs text-muted-foreground">
                {(decryptedFileBlob.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground flex flex-col gap-2">
               <div className="flex items-center gap-2 justify-center">
                 <Shield className="h-4 w-4" /> <span>End-to-end Encrypted</span>
               </div>
               <div className="flex items-center gap-2 justify-center">
                 <Lock className="h-4 w-4" /> <span>Deleted from Server</span>
               </div>
            </div>

            <Button onClick={handleDownload} size="lg" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download File
            </Button>
            
            <Link href="/" className="block">
              <Button variant="ghost" className="w-full">Share Another Secret</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
