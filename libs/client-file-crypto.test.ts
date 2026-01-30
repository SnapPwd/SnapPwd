import { describe, it, expect } from "vitest";
import { encryptFile, decryptFile } from "./client-file-crypto";
import { generateEncryptionKey } from "./client-crypto"; // Re-use key generation

// Mock a File object
const createMockFile = (content: string, filename: string, type: string): File => {
  const blob = new Blob([content], { type });
  return new File([blob], filename, { type });
};

describe("encryptFile and decryptFile", () => {
  it("encrypts and decrypts a simple text file", async () => {
    const key = generateEncryptionKey();
    const fileContent = "This is a test file for encryption.";
    const filename = "test.txt";
    const fileType = "text/plain";
    const originalFile = createMockFile(fileContent, filename, fileType);

    // Encrypt the file
    const { iv, encryptedData } = await encryptFile(originalFile, key);

    expect(encryptedData.byteLength).toBeGreaterThan(0);
    expect(iv.length).toBe(12);

    // Decrypt the file
    const decryptedBlob = await decryptFile(
      iv,
      encryptedData,
      key,
      filename,
      fileType
    );

    expect(decryptedBlob).toBeInstanceOf(Blob);
    expect(decryptedBlob.type).toBe(fileType);

    const decryptedText = await decryptedBlob.text();
    expect(decryptedText).toBe(fileContent);
  });

  it("encrypts and decrypts an empty file", async () => {
    const key = generateEncryptionKey();
    const fileContent = "";
    const filename = "empty.txt";
    const fileType = "text/plain";
    const originalFile = createMockFile(fileContent, filename, fileType);

    const { iv, encryptedData } = await encryptFile(originalFile, key);

    expect(encryptedData.byteLength).toBeGreaterThan(0); // Still has IV and GCM overhead
    expect(iv.length).toBe(12);

    const decryptedBlob = await decryptFile(
      iv,
      encryptedData,
      key,
      filename,
      fileType
    );

    const decryptedText = await decryptedBlob.text();
    expect(decryptedText).toBe(fileContent);
  });

  it("fails to decrypt with a wrong key", async () => {
    const key1 = generateEncryptionKey();
    const key2 = generateEncryptionKey(); // Different key
    const fileContent = "Sensitive data.";
    const filename = "secret.txt";
    const fileType = "text/plain";
    const originalFile = createMockFile(fileContent, filename, fileType);

    const { iv, encryptedData } = await encryptFile(originalFile, key1);

    // Attempt to decrypt with the wrong key
    await expect(
      decryptFile(iv, encryptedData, key2, filename, fileType)
    ).rejects.toThrow();
  });

  it("fails to decrypt with tampered data", async () => {
    const key = generateEncryptionKey();
    const fileContent = "Another secret.";
    const filename = "tamper.txt";
    const fileType = "text/plain";
    const originalFile = createMockFile(fileContent, filename, fileType);

    const { iv, encryptedData } = await encryptFile(originalFile, key);

    // Tamper with the encrypted data (e.g., flip a byte)
    const tamperedData = new Uint8Array(encryptedData);
    tamperedData[0] = tamperedData[0] ^ 0xff; // XOR first byte to tamper

    await expect(
      decryptFile(iv, tamperedData.buffer, key, filename, fileType)
    ).rejects.toThrow();
  });

  it("encrypts and decrypts with non-text content type", async () => {
    const key = generateEncryptionKey();
    const fileContent = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    const filename = "binary.bin";
    const fileType = "application/octet-stream";
    const originalFile = new File([fileContent], filename, { type: fileType });

    const { iv, encryptedData } = await encryptFile(originalFile, key);

    const decryptedBlob = await decryptFile(
      iv,
      encryptedData,
      key,
      filename,
      fileType
    );

    expect(decryptedBlob.type).toBe(fileType);
    const decryptedArrayBuffer = await decryptedBlob.arrayBuffer();
    expect(new Uint8Array(decryptedArrayBuffer)).toEqual(fileContent);
  });
});
