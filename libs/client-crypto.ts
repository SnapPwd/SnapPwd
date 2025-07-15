"use client";

/**
 * Generate a random encryption key
 *
 * @returns Hex string of the key
 */
export function generateEncryptionKey(): string {
  // Generate a random array of 16 bytes (128 bits)
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);

  // Convert to hex string
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Encrypt data with AES using the Web Crypto API
 *
 * @param plaintext
 * @param key Hex string of the key
 * @returns Base64 string of the encrypted data
 */
export async function encryptData(
  plaintext: string,
  key: string
): Promise<string> {
  // Convert the hex key to a CryptoKey
  const keyData = key.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16));
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    new Uint8Array(keyData),
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
 * @param key Hex string of the key
 * @returns
 */
export async function decryptData(
  encryptedBase64: string,
  key: string
): Promise<string> {
  // Convert the hex key to a CryptoKey
  const keyData = key.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16));
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    new Uint8Array(keyData),
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
