"use client";

import {
  base58Decode,
  base58Encode,
  generateEncryptionKey,
  isValidBase58Key,
} from "./client-crypto"; // Import existing utilities

/**
 * Encrypt a File with AES-GCM using the Web Crypto API.
 *
 * @param file The File object to encrypt.
 * @param key Base58 string of the key.
 * @returns A promise that resolves to an object containing the IV and the encrypted data as an ArrayBuffer.
 */
export async function encryptFile(
  file: File,
  key: string
): Promise<{ iv: Uint8Array; encryptedData: ArrayBuffer }> {
  const keyData = base58Decode(key);
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyData.buffer.slice(keyData.byteOffset, keyData.byteOffset + keyData.byteLength) as ArrayBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Read the file as an ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv as unknown as BufferSource,
    },
    cryptoKey,
    arrayBuffer as unknown as BufferSource
  );

  return { iv, encryptedData: encryptedData as ArrayBuffer };
}

/**
 * Decrypt file data with AES-GCM using the Web Crypto API.
 *
 * @param iv The Initialization Vector (Uint8Array) used for encryption.
 * @param encryptedData The encrypted file data as an ArrayBuffer.
 * @param key Base58 string of the key.
 * @param originalFilename The original filename (optional, for Blob creation).
 * @param contentType The MIME type of the file (optional, for Blob creation).
 * @returns A promise that resolves to a Blob containing the decrypted file.
 */
export async function decryptFile(
  iv: Uint8Array,
  encryptedData: ArrayBuffer,
  key: string,
  originalFilename?: string,
  contentType?: string
): Promise<Blob> {
  const keyData = base58Decode(key);
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyData.buffer.slice(keyData.byteOffset, keyData.byteOffset + keyData.byteLength) as ArrayBuffer,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv as unknown as BufferSource,
    },
    cryptoKey,
    encryptedData as unknown as BufferSource
  );

  // Create a Blob from the decrypted data
  return new Blob([decryptedData], { type: contentType || "application/octet-stream" });
}
