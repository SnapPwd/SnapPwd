"use server";

import { revalidatePath } from "next/cache";
import shortUUID from "short-uuid";
import { redisClient } from "./redis-client";

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
  revalidatePath("/");

  const matchStorageKey = secretId.match(/sp-[a-zA-Z1-9]+/);
  if (matchStorageKey && matchStorageKey.length === 1) {
    const storageKey = matchStorageKey[0];

    const redis = await redisClient();
    const value = await redis.getDel(storageKey);
    if (value && typeof value === "string") {
      return value;
    }
  }

  return null;
}

export async function deleteSecret(secretId: string) {
  const redis = await redisClient();
  await redis.del(secretId);
}
