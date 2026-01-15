export interface PasswordConfig {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
}

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
} as const;

/**
 * Generate a secure random password with the given configuration.
 * Ensures at least one character from each selected character type.
 */
export function generatePassword(config: PasswordConfig): string {
  let allChars = "";
  const required: string[] = [];

  if (config.useUppercase) {
    allChars += CHARSETS.uppercase;
    required.push(
      CHARSETS.uppercase[Math.floor(Math.random() * CHARSETS.uppercase.length)]
    );
  }
  if (config.useLowercase) {
    allChars += CHARSETS.lowercase;
    required.push(
      CHARSETS.lowercase[Math.floor(Math.random() * CHARSETS.lowercase.length)]
    );
  }
  if (config.useNumbers) {
    allChars += CHARSETS.numbers;
    required.push(
      CHARSETS.numbers[Math.floor(Math.random() * CHARSETS.numbers.length)]
    );
  }
  if (config.useSymbols) {
    allChars += CHARSETS.symbols;
    required.push(
      CHARSETS.symbols[Math.floor(Math.random() * CHARSETS.symbols.length)]
    );
  }

  // If no character types selected, use all
  if (allChars === "") {
    allChars =
      CHARSETS.uppercase +
      CHARSETS.lowercase +
      CHARSETS.numbers +
      CHARSETS.symbols;
    required.push(
      CHARSETS.uppercase[Math.floor(Math.random() * CHARSETS.uppercase.length)],
      CHARSETS.lowercase[Math.floor(Math.random() * CHARSETS.lowercase.length)],
      CHARSETS.numbers[Math.floor(Math.random() * CHARSETS.numbers.length)],
      CHARSETS.symbols[Math.floor(Math.random() * CHARSETS.symbols.length)]
    );
  }

  const password = [...required];

  // Fill the rest with random characters
  for (let i = password.length; i < config.length; i++) {
    password.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the password array (Fisher-Yates)
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
}
