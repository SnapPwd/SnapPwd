"use server";

import { kv } from "@vercel/kv";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import CryptoJS from "crypto-js";
import { revalidatePath } from "next/cache";
import shortUUID from "short-uuid";

export async function encryptAndStoreSecret(
  secret: string,
  expiration: number
) {
  const encryptionKey = CryptoJS.lib.WordArray.random(128 / 8).toString();
  const storageKey = `sp-${shortUUID.generate()}`;

  const encrypted = AES.encrypt(secret, encryptionKey).toString();
  await kv.set(storageKey, encrypted, { ex: expiration, nx: true });

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
    const value = await kv.getdel(storageKey);
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
  await kv.del(secretId);
}
