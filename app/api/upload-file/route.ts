import { NextResponse } from "next/server";
import { storeEncryptedFile, FileMetadata } from "@/libs/snappwd";
import { Buffer } from "buffer";

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

    // Convert Base64 encrypted data back to ArrayBuffer
    const encryptedDataBuffer = Buffer.from(encryptedData, "base64");
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
