import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Shield,
  RefreshCw,
  Sparkles,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import { FaLock } from "react-icons/fa";
import React, { useRef, useState, useCallback, useMemo } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  generatePassword,
  PasswordConfig,
} from "@/libs/password-generator";

interface SecretInputProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function SecretInput({ onChange }: SecretInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [passwordConfig, setPasswordConfig] = useState<PasswordConfig>({
    length: 24,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: true,
  });

  const { isCopied, copy } = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    if (textareaRef.current?.value) {
      copy(textareaRef.current.value);
    }
  }, [copy]);

  const handleGeneratePassword = useCallback(() => {
    setIsGenerating(true);
    const newPassword = generatePassword(passwordConfig);

    // Add a slight delay for visual feedback
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.value = newPassword;
        setHasContent(true);
        // Trigger the onChange handler if it exists
        if (onChange) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype,
            "value"
          )?.set;
          nativeInputValueSetter?.call(textareaRef.current, newPassword);
          const event = new Event("input", { bubbles: true });
          textareaRef.current.dispatchEvent(event);
          // Call onChange directly with a synthetic-like object
          onChange({
            target: textareaRef.current,
            currentTarget: textareaRef.current,
          } as React.ChangeEvent<HTMLTextAreaElement>);
        }
      }
      setIsGenerating(false);
    }, 300);
  }, [passwordConfig, onChange]);

  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasContent(e.target.value.length > 0);
      onChange?.(e);
    },
    [onChange]
  );

  const handleLengthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfig((prev) => ({
        ...prev,
        length: parseInt(e.target.value),
      }));
    },
    []
  );

  const handleUppercaseChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfig((prev) => ({
        ...prev,
        useUppercase: e.target.checked,
      }));
    },
    []
  );

  const handleLowercaseChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfig((prev) => ({
        ...prev,
        useLowercase: e.target.checked,
      }));
    },
    []
  );

  const handleNumbersChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfig((prev) => ({
        ...prev,
        useNumbers: e.target.checked,
      }));
    },
    []
  );

  const handleSymbolsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfig((prev) => ({
        ...prev,
        useSymbols: e.target.checked,
      }));
    },
    []
  );

  const passwordDescription = useMemo(() => {
    const { length, useUppercase, useLowercase, useNumbers, useSymbols } =
      passwordConfig;
    const types = [];
    if (useUppercase) types.push("uppercase");
    if (useLowercase) types.push("lowercase");
    if (useNumbers) types.push("numbers");
    if (useSymbols) types.push("symbols");

    return `${length}-character password with ${
      types.join(", ") || "all characters"
    }`;
  }, [passwordConfig]);

  return (
    <div className="flex flex-col gap-3">
      {/* Secure badge */}
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <Shield className="h-3.5 w-3.5 text-slate-500" />
        <span className="font-medium">End-to-end encrypted</span>
      </div>

      {/* Main input container with focus effect */}
      <div
        className={`relative rounded-lg transition-all duration-200 ${
          isFocused
            ? "ring-2 ring-slate-400 shadow-md"
            : "ring-1 ring-slate-300"
        }`}
      >
        <div className="relative flex flex-row">
          {/* Left security indicator */}
          <div className="flex items-center justify-center w-8 bg-slate-50 rounded-l-lg border-r border-slate-300">
            <FaLock className="h-4 w-4 text-slate-400" />
          </div>

          {/* Textarea */}
          <Textarea
            ref={textareaRef}
            className="min-h-[240px] rounded-l-none rounded-r-lg border-0 focus-visible:ring-0 font-mono text-sm bg-white resize-none pr-10"
            id="secret"
            name="secret"
            required
            placeholder="Enter your secret here... passwords, API keys, credentials, or any sensitive data you need to share securely."
            onChange={handleTextareaChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {/* Copy button in bottom right corner */}
          {hasContent && (
            <button
              type="button"
              onClick={handleCopy}
              className="absolute bottom-2 right-2 p-2 rounded-md hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
              title="Copy to clipboard"
              aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Action buttons row */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGeneratePassword}
            disabled={isGenerating}
            className="flex items-center gap-2 hover:bg-slate-50 transition-all duration-200 group min-w-[180px] justify-center"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-500" />
                <span className="font-medium">Generate Password</span>
              </>
            )}
          </Button>

          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500">{passwordDescription}</span>
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label={showConfig ? "Hide password options" : "Show password options"}
              aria-expanded={showConfig}
            >
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  showConfig ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Expandable config section */}
        {showConfig && (
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
            {/* Length slider */}
            <div className="space-y-2">
              <label
                htmlFor="password-length"
                className="text-xs font-semibold text-slate-700 flex items-center justify-between"
              >
                <span>Password Length</span>
                <span className="text-slate-500">{passwordConfig.length}</span>
              </label>
              <input
                id="password-length"
                type="range"
                min="8"
                max="64"
                value={passwordConfig.length}
                onChange={handleLengthChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            {/* Character type checkboxes */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <label
                  htmlFor="use-uppercase"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    id="use-uppercase"
                    type="checkbox"
                    checked={passwordConfig.useUppercase}
                    onChange={handleUppercaseChange}
                    className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">
                    Uppercase (A-Z)
                  </span>
                </label>
                <label
                  htmlFor="use-lowercase"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    id="use-lowercase"
                    type="checkbox"
                    checked={passwordConfig.useLowercase}
                    onChange={handleLowercaseChange}
                    className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">
                    Lowercase (a-z)
                  </span>
                </label>
                <label
                  htmlFor="use-numbers"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    id="use-numbers"
                    type="checkbox"
                    checked={passwordConfig.useNumbers}
                    onChange={handleNumbersChange}
                    className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">Numbers (0-9)</span>
                </label>
                <label
                  htmlFor="use-symbols"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    id="use-symbols"
                    type="checkbox"
                    checked={passwordConfig.useSymbols}
                    onChange={handleSymbolsChange}
                    className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">Symbols (!@#$)</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
