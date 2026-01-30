import { NextResponse } from "next/server";
import { deleteSecret } from "@/libs/snappwd"; // Re-use deleteSecret which calls redis.del

export async function POST(request: Request) {
  let fileId: string | undefined;
  
  try {
    const body = await request.json();
    fileId = body.fileId;

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
    console.error(`Error in /api/delete-file for fileId ${fileId || 'unknown'}:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
