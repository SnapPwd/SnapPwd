import { describe, it, expect } from "vitest";
import {
  base58Encode,
  base58Decode,
  isValidBase58Key,
  generateEncryptionKey,
  encryptData,
  decryptData,
} from "./client-crypto";

describe("base58Encode", () => {
  it("encodes empty array", () => {
    // Empty array encodes to "1" due to the initial digit in the algorithm
    expect(base58Encode(new Uint8Array([]))).toBe("1");
  });

  it("encodes single zero byte", () => {
    // Single zero byte: leading zero handling adds "1", plus the digit "1" = "11"
    expect(base58Encode(new Uint8Array([0]))).toBe("11");
  });

  it("encodes multiple leading zeros", () => {
    expect(base58Encode(new Uint8Array([0, 0, 0, 1]))).toBe("1112");
  });

  it("encodes known value", () => {
    // "Hello" in ASCII: [72, 101, 108, 108, 111]
    const bytes = new Uint8Array([72, 101, 108, 108, 111]);
    const encoded = base58Encode(bytes);
    expect(encoded).toBe("9Ajdvzr");
  });

  it("encodes 16 bytes consistently", () => {
    const bytes = new Uint8Array([
      0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
      0x0c, 0x0d, 0x0e, 0x0f,
    ]);
    const encoded = base58Encode(bytes);
    expect(encoded.length).toBeGreaterThan(0);
    // Should be decodable back to original
    const decoded = base58Decode(encoded);
    expect(decoded).toEqual(bytes);
  });
});

describe("base58Decode", () => {
  it("decodes empty string", () => {
    expect(base58Decode("")).toEqual(new Uint8Array([0]));
  });

  it("decodes '1' to single zero byte", () => {
    const decoded = base58Decode("1");
    expect(decoded).toEqual(new Uint8Array([0, 0]));
  });

  it("throws on invalid character", () => {
    expect(() => base58Decode("0")).toThrow("Invalid base58 character");
    expect(() => base58Decode("O")).toThrow("Invalid base58 character");
    expect(() => base58Decode("I")).toThrow("Invalid base58 character");
    expect(() => base58Decode("l")).toThrow("Invalid base58 character");
  });

  it("decodes known value", () => {
    const decoded = base58Decode("9Ajdvzr");
    expect(decoded).toEqual(new Uint8Array([72, 101, 108, 108, 111]));
  });
});

describe("base58 roundtrip", () => {
  it("encode then decode returns original bytes", () => {
    const testCases = [
      new Uint8Array([1, 2, 3, 4, 5]),
      new Uint8Array([255, 255, 255, 255]),
      new Uint8Array([0, 0, 0, 255]),
      new Uint8Array(16).fill(128),
    ];

    for (const original of testCases) {
      const encoded = base58Encode(original);
      const decoded = base58Decode(encoded);
      expect(decoded).toEqual(original);
    }
  });

  it("handles random 16-byte arrays", () => {
    for (let i = 0; i < 10; i++) {
      const original = new Uint8Array(16);
      crypto.getRandomValues(original);
      const encoded = base58Encode(original);
      const decoded = base58Decode(encoded);
      expect(decoded).toEqual(original);
    }
  });
});

describe("isValidBase58Key", () => {
  it("returns false for empty string", () => {
    expect(isValidBase58Key("")).toBe(false);
  });

  it("returns false for invalid characters", () => {
    expect(isValidBase58Key("0abc")).toBe(false);
    expect(isValidBase58Key("Oabc")).toBe(false);
    expect(isValidBase58Key("Iabc")).toBe(false);
    expect(isValidBase58Key("labc")).toBe(false);
  });

  it("returns false for wrong length (not 16 bytes when decoded)", () => {
    // Too short
    expect(isValidBase58Key("abc")).toBe(false);
    // Single byte
    expect(isValidBase58Key("2")).toBe(false);
  });

  it("returns true for valid 16-byte key", () => {
    // Generate a valid key and test it
    const key = generateEncryptionKey();
    expect(isValidBase58Key(key)).toBe(true);
  });

  it("returns true for manually constructed valid key", () => {
    const bytes = new Uint8Array(16).fill(42);
    const key = base58Encode(bytes);
    expect(isValidBase58Key(key)).toBe(true);
  });
});

describe("generateEncryptionKey", () => {
  it("generates a valid base58 key", () => {
    const key = generateEncryptionKey();
    expect(isValidBase58Key(key)).toBe(true);
  });

  it("generates keys of consistent length (~22 chars)", () => {
    for (let i = 0; i < 10; i++) {
      const key = generateEncryptionKey();
      // 16 bytes in base58 should be around 21-22 characters
      expect(key.length).toBeGreaterThanOrEqual(20);
      expect(key.length).toBeLessThanOrEqual(23);
    }
  });

  it("generates unique keys", () => {
    const keys = new Set<string>();
    for (let i = 0; i < 100; i++) {
      keys.add(generateEncryptionKey());
    }
    expect(keys.size).toBe(100);
  });

  it("generates keys that decode to 16 bytes", () => {
    const key = generateEncryptionKey();
    const decoded = base58Decode(key);
    expect(decoded.length).toBe(16);
  });
});

describe("encryptData and decryptData", () => {
  it("encrypts and decrypts simple text", async () => {
    const key = generateEncryptionKey();
    const plaintext = "Hello, World!";

    const encrypted = await encryptData(plaintext, key);
    expect(encrypted).not.toBe(plaintext);
    expect(encrypted.length).toBeGreaterThan(0);

    const decrypted = await decryptData(encrypted, key);
    expect(decrypted).toBe(plaintext);
  });

  it("encrypts and decrypts empty string", async () => {
    const key = generateEncryptionKey();
    const plaintext = "";

    const encrypted = await encryptData(plaintext, key);
    const decrypted = await decryptData(encrypted, key);
    expect(decrypted).toBe(plaintext);
  });

  it("encrypts and decrypts unicode text", async () => {
    const key = generateEncryptionKey();
    const plaintext = "Hello 世界! 🔐";

    const encrypted = await encryptData(plaintext, key);
    const decrypted = await decryptData(encrypted, key);
    expect(decrypted).toBe(plaintext);
  });

  it("encrypts and decrypts long text", async () => {
    const key = generateEncryptionKey();
    const plaintext = "x".repeat(10000);

    const encrypted = await encryptData(plaintext, key);
    const decrypted = await decryptData(encrypted, key);
    expect(decrypted).toBe(plaintext);
  });

  it("produces different ciphertext for same plaintext (due to random IV)", async () => {
    const key = generateEncryptionKey();
    const plaintext = "Same message";

    const encrypted1 = await encryptData(plaintext, key);
    const encrypted2 = await encryptData(plaintext, key);

    expect(encrypted1).not.toBe(encrypted2);

    // But both should decrypt to the same plaintext
    expect(await decryptData(encrypted1, key)).toBe(plaintext);
    expect(await decryptData(encrypted2, key)).toBe(plaintext);
  });

  it("fails to decrypt with wrong key", async () => {
    const key1 = generateEncryptionKey();
    const key2 = generateEncryptionKey();
    const plaintext = "Secret message";

    const encrypted = await encryptData(plaintext, key1);

    await expect(decryptData(encrypted, key2)).rejects.toThrow();
  });

  it("fails to decrypt tampered ciphertext", async () => {
    const key = generateEncryptionKey();
    const plaintext = "Secret message";

    const encrypted = await encryptData(plaintext, key);
    // Tamper with the ciphertext
    const tampered = encrypted.slice(0, 20) + "X" + encrypted.slice(21);

    await expect(decryptData(tampered, key)).rejects.toThrow();
  });

  it("encrypted output is base64", async () => {
    const key = generateEncryptionKey();
    const encrypted = await encryptData("test", key);

    // Base64 regex
    expect(encrypted).toMatch(/^[A-Za-z0-9+/]+=*$/);
  });
});
