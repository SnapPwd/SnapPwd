"use client";

import { Button } from "@/components/ui/button";
import SecretInput from "@/components/ui/SecretInput";
import SecretLinkResult from "@/components/ui/SecretLinkResult";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Loader2, Clock, Link2, Lock } from "lucide-react";
import { addMinutes, addYears, format } from "date-fns";
import { storeEncryptedSecret, getMaxSecretSize } from "@/app/actions";
import { encryptData, generateEncryptionKey } from "@/libs/client-crypto";
import {
  useState,
  useEffect,
  FormEvent,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  EXPIRATION_OPTIONS,
  ExpirationValue,
  isCustomExpiration,
  CUSTOM_EXPIRATION_MIN_SECONDS,
  CUSTOM_EXPIRATION_MAX_SECONDS,
} from "@/libs/constants";

export default function SecretForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [maxSize, setMaxSize] = useState<{ bytes: number; display: string }>({
    bytes: 1048576, // Default 1MB
    display: "1MB",
  });
  const [secretLength, setSecretLength] = useState(0);
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [selectedExpiration, setSelectedExpiration] =
    useState<ExpirationValue>("one_hour");
  const [customDateTime, setCustomDateTime] = useState<Date | undefined>(
    undefined
  );

  // Helper functions for custom datetime
  const minDateTime = useMemo(() => addMinutes(new Date(), 5), []);
  const maxDateTime = useMemo(() => addYears(new Date(), 1), []);

  const calculateCustomExpirationSeconds = useCallback(
    (date: Date | undefined): number | null => {
      if (!date) return null;
      const now = new Date();
      const diffSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

      if (diffSeconds < CUSTOM_EXPIRATION_MIN_SECONDS) return null;
      if (diffSeconds > CUSTOM_EXPIRATION_MAX_SECONDS) return null;

      return diffSeconds;
    },
    []
  );

  const isCustomDateTimeValid = useMemo(() => {
    if (!isCustomExpiration(selectedExpiration)) return true;
    const seconds = calculateCustomExpirationSeconds(customDateTime);
    return seconds !== null;
  }, [selectedExpiration, customDateTime, calculateCustomExpirationSeconds]);

  // Derive isFlipped from generatedUrl
  const isFlipped = generatedUrl !== "";

  // Derive character count from byte length (approximate)
  const secretCharCount = Math.ceil(secretLength / 1.5);

  // Fetch max size configuration on mount
  useEffect(() => {
    getMaxSecretSize().then(setMaxSize);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const secretValue = formData.get("secret");
    const expirationValue = formData.get("expiration");

    try {
      if (typeof secretValue !== "string" || secretValue.length === 0) {
        alert("Please enter a secret.");
        setIsSubmitting(false);
        return;
      }

      // Client-side size validation using already-computed state
      if (secretLength > maxSize.bytes) {
        const approxChars = Math.ceil(secretLength / 1.5);
        const maxApproxChars = Math.floor(maxSize.bytes / 1.5);
        alert(
          `Secret is too large. Your secret has approximately ${approxChars.toLocaleString()} characters, but the maximum is around ${maxApproxChars.toLocaleString()} characters (${
            maxSize.display
          }).`
        );
        setIsSubmitting(false);
        return;
      }

      const validExpirations = EXPIRATION_OPTIONS.map((o) => o.value);
      if (
        typeof expirationValue !== "string" ||
        !validExpirations.includes(expirationValue as ExpirationValue)
      ) {
        alert("Please select a valid expiration.");
        setIsSubmitting(false);
        return;
      }

      // For custom expiration, calculate and validate seconds
      let expirationSeconds: number | undefined;
      if (isCustomExpiration(expirationValue as ExpirationValue)) {
        const seconds = calculateCustomExpirationSeconds(customDateTime);
        if (seconds === null) {
          alert(
            "Please select a valid future date and time (5 minutes to 1 year from now)."
          );
          setIsSubmitting(false);
          return;
        }
        expirationSeconds = seconds;
      }

      // Generate a random encryption key in the browser
      const encryptionKey = generateEncryptionKey();

      // Encrypt the secret in the browser
      const encryptedSecret = await encryptData(secretValue, encryptionKey);

      // Send only the encrypted data to the server
      const storageKey = await storeEncryptedSecret(
        encryptedSecret,
        expirationValue,
        expirationSeconds
      );

      // Build the complete URL with the encryption key in the hash
      const baseUrl = window.location.origin;
      const secretUrl = `${baseUrl}/g/${encodeURIComponent(
        storageKey
      )}#${encodeURIComponent(encryptionKey)}`;

      // Set the generated URL (which automatically flips the card)
      setGeneratedUrl(secretUrl);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Encryption error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(
        `Failed to encrypt and store your secret: ${errorMessage}\n\nPlease try again.`
      );
      setIsSubmitting(false);
    }
  };

  const handleCreateAnother = useCallback(() => {
    setGeneratedUrl("");
    setSecretLength(0);
    setSelectedExpiration("one_hour");
    setCustomDateTime(undefined);
    formRef.current?.reset();
  }, []);

  const handleSecretChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const sizeBytes = new TextEncoder().encode(value).length;
      setSecretLength(sizeBytes);
    },
    []
  );

  // Calculate approximate character limit (assuming average 1.5 bytes per character for UTF-8)
  const maxChars = Math.floor(maxSize.bytes / 1.5);

  return (
    <div className="w-full relative">
      {/* Form */}
      <div
        className={`w-full transition-all duration-300 ${
          isFlipped
            ? "opacity-0 pointer-events-none absolute inset-0"
            : "opacity-100"
        }`}
      >
        <h2 className="text-xl mb-6 flex items-center justify-center text-foreground">
          <Lock className="h-5 w-5 mr-2" /> Create Your Secure Link
        </h2>
        <form
          ref={formRef}
          className="flex flex-col lg:flex-row w-full gap-8"
          id="generateUrl"
          onSubmit={handleSubmit}
        >
          {/* Left side - Secret Input */}
          <div className="flex-1">
            <SecretInput onChange={handleSecretChange} />

            {/* Character counter with modern styling */}
            <div className="mt-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-foreground font-medium">
                  {secretCharCount.toLocaleString()}
                </span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">
                  ~{maxChars.toLocaleString()} characters
                </span>
              </div>
              <span
                className={`font-medium transition-colors ${
                  secretLength > maxSize.bytes
                    ? "text-destructive"
                    : "text-foreground"
                }`}
              >
                {secretLength > maxSize.bytes
                  ? "Exceeds size limit"
                  : `${(
                      maxChars - secretCharCount
                    ).toLocaleString()} remaining`}
              </span>
            </div>
          </div>

          {/* Right side - Settings & Action */}
          <div className="flex flex-col gap-6 w-full lg:w-64">
            {/* Expiration selector with modern design */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="expiration"
                className="text-sm font-semibold text-foreground flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Link Expiration
              </label>
              <select
                className="border border-input rounded-lg p-3 w-full bg-background text-foreground hover:border-ring focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all outline-none text-sm font-medium cursor-pointer"
                name="expiration"
                id="expiration"
                value={selectedExpiration}
                onChange={(e) =>
                  setSelectedExpiration(e.target.value as ExpirationValue)
                }
              >
                {EXPIRATION_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your secret will be permanently deleted after this time period
              </p>

              {/* Custom datetime picker */}
              {isCustomExpiration(selectedExpiration) && (
                <DateTimePicker
                  date={customDateTime}
                  onDateChange={setCustomDateTime}
                  minDate={minDateTime}
                  maxDate={maxDateTime}
                  placeholder="Select expiration date"
                  className="mt-2"
                />
              )}
            </div>

            {/* Generate button with modern styling */}
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 text-base h-12"
              type="submit"
              disabled={
                isSubmitting ||
                secretLength > maxSize.bytes ||
                !isCustomDateTimeValid
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Link...
                </>
              ) : (
                <>
                  <Link2 className="mr-2 h-5 w-5" />
                  Generate Secure Link
                </>
              )}
            </Button>

            {/* Security features badge */}
            <div className="flex flex-col gap-2 p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                <span>One-time access only</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                <span>Auto-expires after time limit</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                <span>End-to-end encrypted</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Result */}
      <div
        className={`w-full transition-all duration-300 ${
          isFlipped
            ? "opacity-100"
            : "opacity-0 pointer-events-none absolute inset-0"
        }`}
      >
        <SecretLinkResult
          secretUrl={generatedUrl}
          expirationLabel={
            isCustomExpiration(selectedExpiration) && customDateTime
              ? format(customDateTime, "PPpp")
              : (EXPIRATION_OPTIONS.find((o) => o.value === selectedExpiration)
                  ?.label ?? "")
          }
          onCreateAnother={handleCreateAnother}
        />
      </div>
    </div>
  );
}
