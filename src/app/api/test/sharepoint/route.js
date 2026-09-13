import { NextResponse } from "next/server";
import { getAccessToken, getDriveId } from "@/lib/graph";

export async function GET() {
  try {
    const token = await getAccessToken();
    const driveId = await getDriveId(token);

    return NextResponse.json({
      ok: true,
      message: "SharePoint connection successful",
      driveId,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "SharePoint connection failed", error: err.message },
      { status: 500 }
    );
  }
}