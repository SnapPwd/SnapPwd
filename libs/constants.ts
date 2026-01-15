export const EXPIRATION_OPTIONS = [
  { value: "one_hour", label: "1 hour", seconds: 3600 },
  { value: "one_day", label: "1 day", seconds: 86400 },
  { value: "one_week", label: "1 week", seconds: 604800 },
  { value: "two_weeks", label: "2 weeks", seconds: 1209600 },
  { value: "custom", label: "Custom", seconds: null },
] as const;

export const CUSTOM_EXPIRATION_MIN_SECONDS = 300; // 5 minutes
export const CUSTOM_EXPIRATION_MAX_SECONDS = 31536000; // 1 year

export type ExpirationValue = (typeof EXPIRATION_OPTIONS)[number]["value"];

// Predefined expiration options (excludes custom)
type PredefinedExpirationValue = Exclude<ExpirationValue, "custom">;

export const EXPIRATION_SECONDS: Record<PredefinedExpirationValue, number> =
  EXPIRATION_OPTIONS.reduce(
    (acc, opt) => {
      if (opt.seconds !== null) {
        acc[opt.value as PredefinedExpirationValue] = opt.seconds;
      }
      return acc;
    },
    {} as Record<PredefinedExpirationValue, number>
  );

export function isCustomExpiration(value: ExpirationValue): value is "custom" {
  return value === "custom";
}
