# SnapPwd

SnapPwd is a Next.js web app inspired by [snappass](https://github.com/pinterest/snappass). It allows you to securely share passwords and secrets.

## How it works

Each secret content is encrypted using a random 128-bit key. The encrypted secret is stored in a KV store, and a shareable link containing the secret ID is generated.

Secret IDs follow the format `sp-<shortUUID>-<decryptionKey>`:

1. `sp-<shortUUID>` is used as the key in the KV store, with the encrypted secret content as the corresponding value.
2. `<decryptionKey>` is used to decrypt data retrieved from the KV store.

SnapPwd never stores the encryption/decryption key of secrets. These keys are randomly generated and associated with secret IDs. Even if someone gains unauthorized access to the KV store, the stored secrets cannot be read without the knowledge of secret IDs.

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
