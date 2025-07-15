"use server";

import { storeEncryptedSecret as storeSecret } from "@/libs/snappwd";
import { redirect } from "next/navigation";

const expirationOptions = {
  one_hour: 3600,
  one_day: 86400,
  one_week: 604800,
  two_weeks: 1209600,
};

// New function that only stores the already-encrypted secret
export async function storeEncryptedSecret(
  encryptedSecret: string,
  expiration: string
) {
  const expirationKey = expiration.toString() as keyof typeof expirationOptions;

  // Store the already-encrypted secret
  const storageKey = await storeSecret(
    encryptedSecret.toString(),
    expirationOptions[expirationKey]
  );

  // Return just the storage key - the encryption key stays client-side only
  return storageKey;
}

export const revealSecret = async (formData: FormData) => {
  redirect(`/get/${formData.get("secretId")}?reveal=true`);
};
