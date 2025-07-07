"use server";

import { encryptAndStoreSecret } from "@/libs/snappwd";
import { redirect } from "next/navigation";

const expirationOptions = {
  one_hour: 3600,
  one_day: 86400,
  one_week: 604800,
  two_weeks: 1209600,
};

export async function generateUrl(formData: FormData) {
  const { secret, expiration } = Object.fromEntries(formData);
  const expirationKey = expiration.toString() as keyof typeof expirationOptions;

  const k = await encryptAndStoreSecret(
    secret.toString(),
    expirationOptions[expirationKey]
  );
  redirect(`/share/${k}`);
}

export const revealSecret = async (formData: FormData) => {
  redirect(`/get/${formData.get("secretId")}?reveal=true`);
};
