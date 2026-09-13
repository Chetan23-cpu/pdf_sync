import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = await params; // <-- must await this now
  const body = await request.json();
  const { name, url, username, appPassword, status } = body;

  const updateData = { name, url, username, status, updated_at: new Date() };
  if (appPassword) {
    updateData.app_password = appPassword;
  }

  const updatedCount = await db("sites").where({ id }).update(updateData);

  if (updatedCount === 0) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  const site = await db("sites").where({ id }).first();
  return NextResponse.json(site);
}

export async function DELETE(request, { params }) {
  const { id } = await params; // <-- same fix here
  await db("sites").where({ id }).del();
  return NextResponse.json({ deleted: true });
}