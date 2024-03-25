import { validate } from "uuid";
import shortUUID from "short-uuid";

export const getSiteUrl = (trailingSlash: boolean = false) => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ||
    process?.env?.NEXT_PUBLIC_VERCEL_URL ||
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;

  if (trailingSlash) {
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  } else {
    url =
      url.charAt(url.length - 1) === "/"
        ? url.substring(0, url.lastIndexOf("/"))
        : url;
  }
  return url;
};

export const validateSecretId = (id: string) => {
  if (!id.startsWith("sp-") || id.length !== 25) {
    return false;
  }

  // Convert short UUID to full UUID and validate it
  const shortUuid = id.substring(3);
  const uuid = shortUUID().toUUID(shortUuid);
  return validate(uuid);
};
