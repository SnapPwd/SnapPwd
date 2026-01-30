import { NextResponse } from "next/server";
import { deleteSecret } from "@/libs/snappwd"; // Re-use deleteSecret which calls redis.del

export async function POST(request: Request) {
  try {
    const { fileId } = await request.json();

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    // Use the existing deleteSecret function, which handles general secret deletion
    await deleteSecret(fileId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in /api/delete-file for fileId ${fileId}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
