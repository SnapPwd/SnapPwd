"use server";

import { storeEncryptedSecret as storeSecret } from "@/libs/snappwd";
import { redirect } from "next/navigation";
import {
  MAX_SECRET_SIZE_BYTES,
  getMaxSecretSizeDisplay,
} from "@/libs/config";
import {
  EXPIRATION_SECONDS,
  ExpirationValue,
  isCustomExpiration,
  CUSTOM_EXPIRATION_MIN_SECONDS,
  CUSTOM_EXPIRATION_MAX_SECONDS,
} from "@/libs/constants";

/**
 * Get the maximum secret size configuration
 * This allows the client to know the limit without embedding it in the bundle
 */
export async function getMaxSecretSize() {
  return {
    bytes: MAX_SECRET_SIZE_BYTES,
    display: getMaxSecretSizeDisplay(),
  };
}

// New function that only stores the already-encrypted secret
export async function storeEncryptedSecret(
  encryptedSecret: string,
  expiration: string,
  customExpirationSeconds?: number
) {
  const expirationKey = expiration as ExpirationValue;

  let expirationInSeconds: number;

  if (isCustomExpiration(expirationKey)) {
    // Validate custom expiration
    if (
      typeof customExpirationSeconds !== "number" ||
      !Number.isInteger(customExpirationSeconds) ||
      customExpirationSeconds < CUSTOM_EXPIRATION_MIN_SECONDS ||
      customExpirationSeconds > CUSTOM_EXPIRATION_MAX_SECONDS
    ) {
      throw new Error(
        `Custom expiration must be between ${Math.floor(CUSTOM_EXPIRATION_MIN_SECONDS / 60)} minutes and ${Math.floor(CUSTOM_EXPIRATION_MAX_SECONDS / 86400)} days`
      );
    }
    expirationInSeconds = customExpirationSeconds;
  } else {
    if (!(expirationKey in EXPIRATION_SECONDS)) {
      throw new Error("Invalid expiration");
    }
    expirationInSeconds = EXPIRATION_SECONDS[expirationKey];
  }

  if (typeof encryptedSecret !== "string" || encryptedSecret.length === 0) {
    throw new Error("Invalid encrypted secret");
  }

  // Server-side validation: Check encrypted secret size
  // The encrypted data will be larger than the original due to base64 encoding and IV
  // Base64 adds ~33% overhead, IV adds 12 bytes, AES-GCM tag adds 16 bytes
  // We check against a reasonable upper bound
  const maxEncryptedSize = Math.ceil(MAX_SECRET_SIZE_BYTES * 1.5); // Allow 50% overhead
  if (encryptedSecret.length > maxEncryptedSize) {
    throw new Error(
      `Encrypted secret exceeds maximum size of ${getMaxSecretSizeDisplay()}`
    );
  }

  // Store the already-encrypted secret
  const storageKey = await storeSecret(encryptedSecret, expirationInSeconds);

  // Return just the storage key - the encryption key stays client-side only
  return storageKey;
}

export const revealSecret = async (formData: FormData) => {
  redirect(`/get/${formData.get("secretId")}?reveal=true`);
};
