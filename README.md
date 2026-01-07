# SnapPwd

SnapPwd is a Next.js web app inspired by [snappass](https://github.com/pinterest/snappass). It allows you to securely share passwords and secrets.

## How it works

Each secret content is encrypted using a random 128-bit key. The encrypted secret is stored in a KV store, and a shareable link containing the secret ID is generated.

Secret links contain a storage key in the path and a decryption key in the URL fragment.

Storage keys follow the format `sp-<shortUUID>`:

1. `sp-<shortUUID>` is used as the key in the KV store, with the encrypted secret content as the corresponding value.
2. The decryption key is used to decrypt data retrieved from the KV store and is carried client-side in the URL fragment (hash).

SnapPwd never stores the encryption/decryption keys of secrets.

### End-to-End Encryption

SnapPwd uses true end-to-end encryption to protect your secrets:

1. **Client-Side Encryption**: All encryption and decryption happens entirely in your browser using the Web Crypto API.

   - A random 128-bit (16-byte) AES key is generated using `window.crypto.getRandomValues()`
   - The secret is encrypted using AES-GCM with a random 12-byte initialization vector (IV)
   - The encrypted data and IV are combined and encoded as a base64 string

2. **Server-Side Storage**: The server only receives and stores the already-encrypted data.

   - The server never sees the original plaintext secret
   - The server never has access to the encryption key
   - The encryption key is only included in the URL fragment that's shared

3. **Secure Retrieval**: When a recipient opens the secret URL:

   - The encrypted data is fetched from the server
   - The decryption key is extracted from the URL
   - Decryption happens locally in the recipient's browser
   - The encrypted secret is immediately deleted from the server after being retrieved

This approach ensures that even if the server or database is compromised, the attacker cannot decrypt any stored secrets without the unique decryption keys that only exist in the shared URLs.

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
npm install
```

Start dev server:

```
npm run dev
```
