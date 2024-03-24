"use server";

import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import CryptoJS from "crypto-js";
import { revalidatePath } from "next/cache";

export async function encryptAndStoreSecret(
  secret: string,
  expiration: number
) {
  const randomKey = CryptoJS.lib.WordArray.random(128 / 8).toString();
  const secretId = `sp-${uuidv4()}~${randomKey}`;

  const encrypted = AES.encrypt(secret, randomKey).toString();
  await kv.set(secretId, encrypted, { ex: expiration, nx: true });

  return secretId;
}

export async function getSecretAndDecrypt(id: string) {
  revalidatePath("/");

  const match = id.match(/~([a-f0-9]+)/);
  if (match && match.length == 2) {
    const key = match[1];

    const value = await kv.getdel(id);
    if (!value || typeof value !== "string") {
      return null;
    }

    const decrypted = AES.decrypt(value, key).toString(Utf8);
    return decrypted;
  }

  return null;
}

export async function deleteSecret(id: string) {
  await kv.del(id);
}
