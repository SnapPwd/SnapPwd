export const EXPIRATION_OPTIONS = [
  { value: "one_hour", label: "1 hour", seconds: 3600 },
  { value: "one_day", label: "1 day", seconds: 86400 },
  { value: "one_week", label: "1 week", seconds: 604800 },
  { value: "two_weeks", label: "2 weeks", seconds: 1209600 },
] as const;

export type ExpirationValue = (typeof EXPIRATION_OPTIONS)[number]["value"];

export const EXPIRATION_SECONDS: Record<ExpirationValue, number> =
  EXPIRATION_OPTIONS.reduce(
    (acc, opt) => {
      acc[opt.value] = opt.seconds;
      return acc;
    },
    {} as Record<ExpirationValue, number>
  );
