import { NextResponse } from "next/server";
import db from "@/lib/db";
import { randomUUID } from "crypto";

export async function GET() {
  const sites = await db("sites").select("*").orderBy("created_at", "asc");
  return NextResponse.json(sites);
}

export async function POST(request) {
  const body = await request.json();
  const { name, url, username, appPassword, status } = body;

  if (!name || !url || !username) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const id = randomUUID();

  await db("sites").insert({
    id,
    name,
    url,
    username,
    app_password: appPassword || null,
    status: status || "connected",
  });

  const site = await db("sites").where({ id }).first();
  return NextResponse.json(site, { status: 201 });
}