import { createClient } from "redis";

// Use a more generic type to avoid type compatibility issues
type RedisClientType = ReturnType<typeof createClient>;

/**
 * Redis client singleton class
 */
class RedisClientSingleton {
  private static instance: RedisClientSingleton | null = null;
  private client: RedisClientType | null = null;
  private connectionPromise: Promise<RedisClientType> | null = null;

  private constructor() {}

  /**
   * Get the singleton instance
   */
  public static getInstance(): RedisClientSingleton {
    if (!RedisClientSingleton.instance) {
      RedisClientSingleton.instance = new RedisClientSingleton();
    }
    return RedisClientSingleton.instance;
  }

  /**
   * Get the Redis client, creating and connecting it if necessary
   */
  public async getClient(): Promise<RedisClientType> {
    // If we already have a connected client, return it
    if (this.client) {
      return this.client;
    }

    // If we're in the process of connecting, return the existing promise
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    // Create a new connection
    this.connectionPromise = new Promise<RedisClientType>(
      async (resolve, reject) => {
        try {
          const client = createClient({
            url: process.env.REDIS_URL,
          });

          // Set up error handler
          client.on("error", (err) => {
            console.error("Redis client error:", err);
          });

          console.log("Connecting to Redis...");
          await client.connect();

          this.client = client;
          resolve(client);
        } catch (error) {
          console.error("Failed to connect to Redis:", error);
          this.connectionPromise = null;
          reject(error);
        }
      }
    );

    return this.connectionPromise;
  }
}

/**
 * Get the Redis client instance
 * @returns A promise that resolves to the Redis client
 */
export async function redisClient(): Promise<RedisClientType> {
  return RedisClientSingleton.getInstance().getClient();
}
