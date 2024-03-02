import { validate } from "uuid";

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
  return id.startsWith("sp-") && id.length === 39 && validate(id.substring(3));
};
