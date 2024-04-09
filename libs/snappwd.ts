"use server";

import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import CryptoJS from "crypto-js";
import { revalidatePath } from "next/cache";
import shortUUID from "short-uuid";
import { redisClient } from "./redis-client";

export async function encryptAndStoreSecret(
  secret: string,
  expiration: number
) {
  const encryptionKey = CryptoJS.lib.WordArray.random(128 / 8).toString();
  const storageKey = `sp-${shortUUID.generate()}`;

  const encrypted = AES.encrypt(secret, encryptionKey).toString();

  const kv = await redisClient();
  await kv.setEx(storageKey, expiration, encrypted);

  return `${storageKey}-${encryptionKey}`;
}

export async function getSecretAndDecrypt(secretId: string) {
  revalidatePath("/");

  // secretId is in the format of `sp-<shortUUID>-<decryptionKey>`
  const matchStorageKey = secretId.match(/sp-[a-zA-Z1-9]+/);
  const matchDecryptionKey = secretId.match(/[a-f0-9]+/g)?.slice(-1);
  if (
    matchStorageKey &&
    matchStorageKey.length === 1 &&
    matchDecryptionKey &&
    matchDecryptionKey.length === 1
  ) {
    const storageKey = matchStorageKey[0];

    const kv = await redisClient();
    const value = await kv.getDel(storageKey);
    if (!value || typeof value !== "string") {
      return null;
    }

    const decryptionKey = matchDecryptionKey[0];
    const decrypted = AES.decrypt(value, decryptionKey).toString(Utf8);
    return decrypted;
  }

  return null;
}

export async function deleteSecret(secretId: string) {
  const kv = await redisClient();
  await kv.del(secretId);
}
