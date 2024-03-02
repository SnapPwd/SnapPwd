"use server";

import { kv } from "@vercel/kv";
import { v4 as uuidv4 } from "uuid";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import { revalidatePath } from "next/cache";

export async function encryptAndStoreSecret(
  secret: string,
  expiration: number
) {
  const encryptionKey = process.env.SECRET_ENCRYPTION_KEY || "";
  const k = `sp-${uuidv4()}`;

  const encrypted = AES.encrypt(secret, encryptionKey).toString();

  await kv.set(k, encrypted, { ex: expiration, nx: true });

  return k;
}

export async function getSecretAndDecrypt(id: string) {
  revalidatePath("/");

  const encryptionKey = process.env.SECRET_ENCRYPTION_KEY || "";
  const value = await kv.getdel(id);
  if (!value || typeof value !== "string") {
    return null;
  }

  const decrypted = AES.decrypt(value, encryptionKey).toString(Utf8);
  return decrypted;
}

export async function deleteSecret(id: string) {
  await kv.del(id);
}
