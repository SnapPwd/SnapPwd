/**
 * Application configuration
 * Centralizes environment variable access and validation
 */

/**
 * Maximum secret size in bytes
 * Default: 1MB (1048576 bytes)
 * Can be overridden with MAX_SECRET_SIZE_BYTES environment variable
 */
export const MAX_SECRET_SIZE_BYTES =
  parseInt(process.env.MAX_SECRET_SIZE_BYTES || "", 10) || 1024 * 1024; // 1MB

/**
 * Maximum secret size in kilobytes (for display purposes)
 */
export const MAX_SECRET_SIZE_KB = Math.floor(MAX_SECRET_SIZE_BYTES / 1024);

/**
 * Maximum secret size in megabytes (for display purposes)
 */
export const MAX_SECRET_SIZE_MB = Math.floor(MAX_SECRET_SIZE_BYTES / (1024 * 1024));

/**
 * Get a human-readable size string
 */
export function getMaxSecretSizeDisplay(): string {
  if (MAX_SECRET_SIZE_BYTES >= 1024 * 1024) {
    return `${MAX_SECRET_SIZE_MB}MB`;
  }
  return `${MAX_SECRET_SIZE_KB}KB`;
}
