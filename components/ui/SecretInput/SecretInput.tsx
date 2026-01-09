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
import React, { useRef, useState } from "react";

interface SecretInputProps {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface PasswordConfig {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
}

// Generate a secure random password with configuration
const generatePassword = (config: PasswordConfig): string => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let allChars = "";
  const required: string[] = [];

  if (config.useUppercase) {
    allChars += uppercase;
    required.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
  }
  if (config.useLowercase) {
    allChars += lowercase;
    required.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
  }
  if (config.useNumbers) {
    allChars += numbers;
    required.push(numbers[Math.floor(Math.random() * numbers.length)]);
  }
  if (config.useSymbols) {
    allChars += symbols;
    required.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }

  // If no character types selected, use all
  if (allChars === "") {
    allChars = uppercase + lowercase + numbers + symbols;
    required.push(
      uppercase[Math.floor(Math.random() * uppercase.length)],
      lowercase[Math.floor(Math.random() * lowercase.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    );
  }

  let password = [...required];

  // Fill the rest with random characters
  for (let i = password.length; i < config.length; i++) {
    password.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the password array
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
};

export default function SecretInput({ onChange }: SecretInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [passwordConfig, setPasswordConfig] = useState<PasswordConfig>({
    length: 24,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: true,
  });

  const handleCopy = async () => {
    if (textareaRef.current?.value) {
      try {
        await navigator.clipboard.writeText(textareaRef.current.value);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleGeneratePassword = () => {
    setIsGenerating(true);
    const newPassword = generatePassword(passwordConfig);

    // Add a slight delay for visual feedback
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.value = newPassword;
        setHasContent(true);
        // Trigger the onChange handler if it exists
        if (onChange) {
          // Create a proper synthetic event with the textarea element
          const event = new Event('change', { bubbles: true });
          Object.defineProperty(event, 'target', {
            writable: false,
            value: textareaRef.current
          });
          onChange(event as any as React.ChangeEvent<HTMLTextAreaElement>);
        }
      }
      setIsGenerating(false);
    }, 300);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasContent(e.target.value.length > 0);
    if (onChange) {
      onChange(e);
    }
  };

  const getPasswordDescription = () => {
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
  };

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
            <span className="text-xs text-slate-500">
              {getPasswordDescription()}
            </span>
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
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
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Password Length</span>
                <span className="text-slate-500">{passwordConfig.length}</span>
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={passwordConfig.length}
                onChange={(e) =>
                  setPasswordConfig({
                    ...passwordConfig,
                    length: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            {/* Character type checkboxes */}
            <div className="space-y-2">
              {/* <label className="text-xs font-semibold text-slate-700"> */}
              {/* Character Types */}
              {/* </label> */}
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passwordConfig.useUppercase}
                    onChange={(e) =>
                      setPasswordConfig({
                        ...passwordConfig,
                        useUppercase: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">
                    Uppercase (A-Z)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passwordConfig.useLowercase}
                    onChange={(e) =>
                      setPasswordConfig({
                        ...passwordConfig,
                        useLowercase: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">
                    Lowercase (a-z)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passwordConfig.useNumbers}
                    onChange={(e) =>
                      setPasswordConfig({
                        ...passwordConfig,
                        useNumbers: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">Numbers (0-9)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={passwordConfig.useSymbols}
                    onChange={(e) =>
                      setPasswordConfig({
                        ...passwordConfig,
                        useSymbols: e.target.checked,
                      })
                    }
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
