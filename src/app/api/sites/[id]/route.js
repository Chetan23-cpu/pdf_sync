import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const { name, url, username, appPassword, status } = body;

  const updateData = { name, url, username, status, updated_at: new Date() };
  if (appPassword) {
    updateData.app_password = appPassword;
  }

  await db("sites").where({ id }).update(updateData);
  const site = await db("sites").where({ id }).first();
  return NextResponse.json(site);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await db("sites").where({ id }).del();
  return NextResponse.json({ deleted: true });
}