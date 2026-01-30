import { NextResponse } from "next/server";
import { getEncryptedFile, FileMetadata } from "@/libs/snappwd";
import { Buffer } from "buffer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return NextResponse.json({ error: "File ID is required" }, { status: 400 });
  }

  try {
    const storedData = await getEncryptedFile(fileId);

    if (!storedData) {
      return NextResponse.json(
        { error: "File not found or already accessed" },
        { status: 404 }
      );
    }

    const { metadata, encryptedData } = storedData;

    // Convert ArrayBuffer to Base64 string for network transport
    const base64EncryptedData = Buffer.from(encryptedData).toString("base64");

    return NextResponse.json({
      metadata: metadata,
      encryptedData: base64EncryptedData,
    });
  } catch (error) {
    console.error(`Error in /api/get-file for fileId ${fileId}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
