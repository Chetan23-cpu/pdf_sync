import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const sites = await db("sites").select("*");
  const results = [];

  for (const site of sites) {
    try {
      const auth = Buffer.from(`${site.username}:${site.app_password}`).toString("base64");
      const res = await fetch(`${site.url}/wp-json/wp/v2/users/me`, {
        headers: { Authorization: `Basic ${auth}` },
      });

      if (!res.ok) {
        const text = await res.text();
        results.push({ site: site.name, ok: false, error: `${res.status}: ${text}` });
        continue;
      }

      const user = await res.json();
      results.push({ site: site.name, ok: true, loggedInAs: user.name });
    } catch (err) {
      results.push({ site: site.name, ok: false, error: err.message });
    }
  }

  return NextResponse.json({ results });
}