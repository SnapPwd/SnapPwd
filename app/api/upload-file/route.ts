import { NextResponse } from "next/server";
import { storeEncryptedFile, FileMetadata } from "@/libs/snappwd";
import { Buffer } from "buffer";
import { CUSTOM_EXPIRATION_MAX_SECONDS } from "@/libs/constants";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB limit matching client
const MIN_EXPIRATION_SECONDS = 60; // 1 minute

export async function POST(request: Request) {
  try {
    const { metadata, encryptedData, expiration } = await request.json();

    // Validate incoming data
    if (!metadata || !encryptedData || typeof expiration !== "number") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Validate expiration
    if (expiration < MIN_EXPIRATION_SECONDS || expiration > CUSTOM_EXPIRATION_MAX_SECONDS) {
      return NextResponse.json(
        { error: "Invalid expiration time" },
        { status: 400 }
      );
    }

    // Convert Base64 encrypted data back to ArrayBuffer
    const encryptedDataBuffer = Buffer.from(encryptedData, "base64");

    // Validate file size
    if (encryptedDataBuffer.length > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File too large (max 2MB)" },
        { status: 400 }
      );
    }

    const encryptedFileArrayBuffer = encryptedDataBuffer.buffer.slice(
      encryptedDataBuffer.byteOffset,
      encryptedDataBuffer.byteOffset + encryptedDataBuffer.byteLength
    );

    const fileMetadata: FileMetadata = metadata;

    const fileId = await storeEncryptedFile(
      fileMetadata,
      encryptedFileArrayBuffer,
      expiration
    );

    return NextResponse.json({ fileId });
  } catch (error) {
    console.error("Error in /api/upload-file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
