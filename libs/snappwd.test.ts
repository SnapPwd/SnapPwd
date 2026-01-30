import { describe, it, expect, vi, beforeEach } from "vitest";
import { storeEncryptedSecret, getEncryptedSecret, storeEncryptedFile, getEncryptedFile, deleteSecret, FileMetadata } from "./snappwd";
import { redisClient } from "./redis-client";
import shortUUID from "short-uuid";
import { Buffer } from 'buffer';

// Mock redisClient
const mockRedis = {
  setEx: vi.fn(),
  getDel: vi.fn(),
  del: vi.fn(),
  on: vi.fn(), // Mock the .on method as well
  connect: vi.fn(), // Mock the .connect method
};
vi.mock("./redis-client", () => ({
  redisClient: vi.fn(() => Promise.resolve(mockRedis)),
}));

// Mock short-uuid to always return a predictable ID for testing
vi.mock("short-uuid", () => ({
  __esModule: true,
  default: {
    generate: vi.fn(() => "test-uuid"),
  },
}));

describe("storeEncryptedSecret", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("stores a secret in Redis with correct key and expiration", async () => {
    const encryptedSecret = "encryptedText";
    const expiration = 3600;
    const expectedStorageKey = `sp-${shortUUID.generate()}`;

    const resultKey = await storeEncryptedSecret(encryptedSecret, expiration);

    expect(resultKey).toBe(expectedStorageKey);
    expect(mockRedis.setEx).toHaveBeenCalledWith(
      expectedStorageKey,
      expiration,
      encryptedSecret
    );
  });
});

describe("getEncryptedSecret", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retrieves and deletes a secret from Redis", async () => {
    const secretId = "sp-test-uuid";
    const encryptedSecret = "retrievedEncryptedText";
    mockRedis.getDel.mockResolvedValueOnce(encryptedSecret);

    const result = await getEncryptedSecret(secretId);

    expect(result).toBe(encryptedSecret);
    expect(mockRedis.getDel).toHaveBeenCalledWith(secretId);
  });

  it("returns null if secret not found", async () => {
    const secretId = "sp-non-existent";
    mockRedis.getDel.mockResolvedValueOnce(null);

    const result = await getEncryptedSecret(secretId);

    expect(result).toBeNull();
  });

  it("returns null for invalid secretId format", async () => {
    const secretId = "invalid-format";
    // Do not mock getDel here as the check should happen before getDel is called
    const result = await getEncryptedSecret(secretId);

    expect(result).toBeNull();
    expect(mockRedis.getDel).not.toHaveBeenCalled();
  });
});

describe("deleteSecret", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes a secret from Redis", async () => {
    const secretId = "sp-to-delete";

    await deleteSecret(secretId);

    expect(mockRedis.del).toHaveBeenCalledWith(secretId);
  });
});

describe("storeEncryptedFile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("stores an encrypted file in Redis with correct key, expiration, and data", async () => {
    const metadata: FileMetadata = {
      originalFilename: "document.pdf",
      contentType: "application/pdf",
      iv: btoa("random_iv"),
    };
    const encryptedFileData = new Uint8Array([1, 2, 3, 4, 5]).buffer;
    const expiration = 7200; // 2 hours
    const expectedStorageKey = `spf-${shortUUID.generate()}`;

    const resultKey = await storeEncryptedFile(
      metadata,
      encryptedFileData,
      expiration
    );

    const expectedStoredData = JSON.stringify({
      metadata,
      encryptedData: Buffer.from(encryptedFileData).toString("base64"),
    });

    expect(resultKey).toBe(expectedStorageKey);
    expect(mockRedis.setEx).toHaveBeenCalledWith(
      expectedStorageKey,
      expiration,
      expectedStoredData
    );
  });
});

describe("getEncryptedFile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retrieves and deletes an encrypted file from Redis", async () => {
    const fileId = "spf-test-uuid";
    const originalMetadata: FileMetadata = {
      originalFilename: "image.png",
      contentType: "image/png",
      iv: btoa("another_iv"),
    };
    const originalEncryptedData = new Uint8Array([10, 20, 30, 40]).buffer;
    const storedValue = JSON.stringify({
      metadata: originalMetadata,
      encryptedData: Buffer.from(originalEncryptedData).toString("base64"),
    });
    mockRedis.getDel.mockResolvedValueOnce(storedValue);

    const result = await getEncryptedFile(fileId);

    expect(result).not.toBeNull();
    expect(result?.metadata).toEqual(originalMetadata);
    expect(new Uint8Array(result?.encryptedData as ArrayBuffer)).toEqual(
      new Uint8Array(originalEncryptedData)
    );
    expect(mockRedis.getDel).toHaveBeenCalledWith(fileId);
  });

  it("returns null if file not found or already accessed", async () => {
    const fileId = "spf-non-existent";
    mockRedis.getDel.mockResolvedValueOnce(null);

    const result = await getEncryptedFile(fileId);

    expect(result).toBeNull();
  });

  it("returns null for invalid fileId format", async () => {
    const fileId = "invalid-file-format";
    // Do not mock getDel here as the check should happen before getDel is called
    const result = await getEncryptedFile(fileId);

    expect(result).toBeNull();
    expect(mockRedis.getDel).not.toHaveBeenCalled();
  });

  it("rejects on corrupted JSON in Redis", async () => {
    const fileId = "spf-corrupted";
    mockRedis.getDel.mockResolvedValueOnce("{invalid json"); // Corrupted JSON

    await expect(getEncryptedFile(fileId)).rejects.toThrow("Corrupted file data in Redis");
  });
});
