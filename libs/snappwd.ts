"use server";

import shortUUID from "short-uuid";
import { redisClient } from "./redis-client";
import { Buffer } from 'buffer'; // Explicitly import Buffer

/**
 * Store the encrypted secret in Redis
 
 * @param encryptedSecret 
 * @param expiration 
 * @returns 
 */
export async function storeEncryptedSecret(
  encryptedSecret: string,
  expiration: number
) {
  const storageKey = `sp-${shortUUID.generate()}`;

  const redis = await redisClient();
  await redis.setEx(storageKey, expiration, encryptedSecret);

  return storageKey;
}

/**
 * Get the encrypted secret from Redis
 *
 * @param secretId is the storage key in the format of `sp-<shortUUID>`
 * The decryption key is carried client-side in the URL hash fragment.
 * @returns
 */
export async function getEncryptedSecret(secretId: string) {
  if (!secretId.startsWith("sp-")) {
    return null;
  }
  const storageKey = secretId;

  const redis = await redisClient();
  const value = await redis.getDel(storageKey);
  if (value && typeof value === "string") {
    return value;
  }

  return null;
}

export async function deleteSecret(secretId: string) {
  const redis = await redisClient();
  await redis.del(secretId);
}

// --- New functions for File Sharing ---

export interface FileMetadata {
  originalFilename: string;
  contentType: string;
  iv: string; // Base64 encoded IV
}

interface StoredFile {
  metadata: FileMetadata;
  encryptedData: string; // Base64 encoded ArrayBuffer
}

/**
 * Store the encrypted file data and metadata in Redis
 * @param metadata FileMetadata object
 * @param encryptedFileData The encrypted file data as an ArrayBuffer
 * @param expiration Expiration time in seconds
 * @returns The storage key for the file
 */
export async function storeEncryptedFile(
  metadata: FileMetadata,
  encryptedFileData: ArrayBuffer,
  expiration: number
): Promise<string> {
  const storageKey = `spf-${shortUUID.generate()}`;

  // Convert ArrayBuffer to Base64 string for Redis storage
  const base64EncryptedData = Buffer.from(encryptedFileData).toString("base64");

  const storedFile: StoredFile = {
    metadata,
    encryptedData: base64EncryptedData,
  };

  const redis = await redisClient();
  await redis.setEx(storageKey, expiration, JSON.stringify(storedFile));

  return storageKey;
}

/**
 * Get the encrypted file data and metadata from Redis
 * @param fileId The storage key in the format of `spf-<shortUUID>`
 * @returns A promise that resolves to an object containing FileMetadata and encryptedData (as ArrayBuffer), or null if not found.
 */
export async function getEncryptedFile(
  fileId: string
): Promise<{ metadata: FileMetadata; encryptedData: ArrayBuffer } | null> {
  if (!fileId.startsWith("spf-")) {
    return null;
  }
  const storageKey = fileId;

  const redis = await redisClient();
  const value = await redis.getDel(storageKey);

  if (value && typeof value === "string") {
    try {
      const storedFile: StoredFile = JSON.parse(value);

      // Convert Base64 string back to ArrayBuffer
      const encryptedDataBuffer = Buffer.from(storedFile.encryptedData, "base64");
      return {
        metadata: storedFile.metadata,
        encryptedData: encryptedDataBuffer.buffer.slice(
          encryptedDataBuffer.byteOffset,
          encryptedDataBuffer.byteOffset + encryptedDataBuffer.byteLength
        ),
      };
    } catch (parseError) {
      console.error("Failed to parse stored file JSON:", parseError);
      throw new Error("Corrupted file data in Redis");
    }
  }

  return null;
}
