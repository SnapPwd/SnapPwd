"use client";

const BASE58_ALPHABET =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

/**
 * Encode a Uint8Array to base58 string
 */
export function base58Encode(bytes: Uint8Array): string {
  const digits = [0];
  for (let b = 0; b < bytes.length; b++) {
    let carry = bytes[b];
    for (let i = 0; i < digits.length; i++) {
      carry += digits[i] << 8;
      digits[i] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry > 0) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }
  // Handle leading zeros
  let result = "";
  for (let b = 0; b < bytes.length; b++) {
    if (bytes[b] === 0) result += BASE58_ALPHABET[0];
    else break;
  }
  // Convert digits to base58 characters (reverse order)
  for (let i = digits.length - 1; i >= 0; i--) {
    result += BASE58_ALPHABET[digits[i]];
  }
  return result;
}

/**
 * Decode a base58 string to Uint8Array
 */
export function base58Decode(str: string): Uint8Array {
  const bytes = [0];
  for (const char of str) {
    const value = BASE58_ALPHABET.indexOf(char);
    if (value === -1) throw new Error("Invalid base58 character");
    let carry = value;
    for (let i = 0; i < bytes.length; i++) {
      carry += bytes[i] * 58;
      bytes[i] = carry & 0xff;
      carry >>= 8;
    }
    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }
  // Handle leading '1's (zeros in base58)
  const leadingOnes = str.match(/^1*/)?.[0].length || 0;
  const result = new Uint8Array(leadingOnes + bytes.length);
  // Leading zeros
  for (let i = 0; i < leadingOnes; i++) {
    result[i] = 0;
  }
  // Reverse bytes into result
  for (let i = 0; i < bytes.length; i++) {
    result[leadingOnes + i] = bytes[bytes.length - 1 - i];
  }
  return result;
}

/**
 * Validate a base58 encryption key (must decode to exactly 16 bytes)
 */
export function isValidBase58Key(key: string): boolean {
  if (
    !/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/.test(key)
  ) {
    return false;
  }
  try {
    const decoded = base58Decode(key);
    return decoded.length === 16;
  } catch {
    return false;
  }
}

/**
 * Generate a random encryption key
 *
 * @returns Base58 string of the key (16 bytes / 128 bits)
 */
export function generateEncryptionKey(): string {
  // Generate a random array of 16 bytes (128 bits)
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);

  // Convert to base58 string
  return base58Encode(array);
}

/**
 * Encrypt data with AES using the Web Crypto API
 *
 * @param plaintext
 * @param key Base58 string of the key
 * @returns Base64 string of the encrypted data
 */
export async function encryptData(
  plaintext: string,
  key: string
): Promise<string> {
  // Convert the base58 key to a CryptoKey
  const keyData = base58Decode(key);
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyData.buffer.slice(
      keyData.byteOffset,
      keyData.byteOffset + keyData.byteLength
    ) as ArrayBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  // Generate a random IV
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the data
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(plaintext);

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    cryptoKey,
    encodedData
  );

  // Combine the IV and encrypted data and convert to base64
  const result = new Uint8Array(iv.length + encryptedData.byteLength);
  result.set(iv);
  result.set(new Uint8Array(encryptedData), iv.length);

  // Convert Uint8Array to string without using spread operator
  let binaryString = "";
  for (let i = 0; i < result.length; i++) {
    binaryString += String.fromCharCode(result[i]);
  }

  return btoa(binaryString);
}

/**
 * Decrypt data with AES using the Web Crypto API
 *
 * @param encryptedBase64
 * @param key Base58 string of the key
 * @returns
 */
export async function decryptData(
  encryptedBase64: string,
  key: string
): Promise<string> {
  // Convert the base58 key to a CryptoKey
  const keyData = base58Decode(key);
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyData.buffer.slice(
      keyData.byteOffset,
      keyData.byteOffset + keyData.byteLength
    ) as ArrayBuffer,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  // Convert base64 to array buffer
  const binaryString = atob(encryptedBase64);
  const encryptedData = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    encryptedData[i] = binaryString.charCodeAt(i);
  }

  // Extract the IV (first 12 bytes) and the encrypted data
  const iv = encryptedData.slice(0, 12);
  const data = encryptedData.slice(12);

  // Decrypt the data
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    cryptoKey,
    data
  );

  // Convert the decrypted data to a string
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
}
