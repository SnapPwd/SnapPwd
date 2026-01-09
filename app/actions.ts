"use server";

import { storeEncryptedSecret as storeSecret } from "@/libs/snappwd";
import { redirect } from "next/navigation";
import {
  MAX_SECRET_SIZE_BYTES,
  getMaxSecretSizeDisplay,
} from "@/libs/config";

const expirationOptions = {
  one_hour: 3600,
  one_day: 86400,
  one_week: 604800,
  two_weeks: 1209600,
};

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
  expiration: string
) {
  const expirationKey = expiration.toString() as keyof typeof expirationOptions;

  if (!(expirationKey in expirationOptions)) {
    throw new Error("Invalid expiration");
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
  const storageKey = await storeSecret(
    encryptedSecret,
    expirationOptions[expirationKey]
  );

  // Return just the storage key - the encryption key stays client-side only
  return storageKey;
}

export const revealSecret = async (formData: FormData) => {
  redirect(`/get/${formData.get("secretId")}?reveal=true`);
};
