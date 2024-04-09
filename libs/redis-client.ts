import { createClient } from "redis";

let _client: any = null;

export async function redisClient() {
  if (!_client) {
    _client = createClient({
      url: process.env.REDIS_URL,
      socket: { tls: process.env.REDIS_TLS === "true" },
    });
    console.log("Connecting to Redis...");
    await _client.connect();
  }

  return _client;
}
