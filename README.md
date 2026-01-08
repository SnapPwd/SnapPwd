# SnapPwd

SnapPwd allows you to securely share passwords and secrets with end-to-end encryption.

## How it works

SnapPwd implements end-to-end encryption through a client-side encryption approach:

1. **Client-Side Encryption**: When you create a secret, it's encrypted in your browser using the Web Crypto API before ever being sent to the server. A random 128-bit AES key and initialization vector are generated for each secret.

2. **Secure Storage**: Only the encrypted data is stored in Redis. The server never sees or stores the original plaintext or the encryption keys.

3. **Key Distribution**: The decryption key is embedded in the URL fragment (the part after #) that you share. This ensures the key never passes through the server.

4. **One-Time Access**: When a recipient opens the link, their browser fetches the encrypted data, extracts the key from the URL fragment, and decrypts the content locally. The encrypted data is immediately deleted from the server.

5. **Self-Destruction**: Links expire after the configured time or immediately after first access, ensuring secrets can't be retrieved again.

This architecture means:

- The server can never decrypt your secrets
- Secrets are automatically deleted after access
- No registration or personal data required
- End-to-end security regardless of hosting environment

## Dev setup

Run a local redis server:

```
docker run -p 6379:6379  -d --name my-redis redis
```

In `.env.local` set `REDIS_URL` and `REDIS_TLS` as follows:

```
REDIS_URL=redis://127.0.0.1:6379
REDIS_TLS=false
```

Install dependencies:

```
pnpm install
```

Start dev server:

```
pnpm run dev
```
