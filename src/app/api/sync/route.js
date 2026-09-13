import { NextResponse } from "next/server";
import {
  getAccessToken,
  getDriveId,
  getDelta,
  downloadFile,
} from "@/lib/graph";
import {
  findMediaByFilename,
  deleteMedia,
  pushFileToWordPress,
} from "@/lib/wordpress";
import db from "@/lib/db";

let storedDeltaLink;

export async function GET() {
  const log = [];

  try {
    const sites = await db("sites").select("*");
    log.push(`Loaded ${sites.length} site(s) from database`);

    const token = await getAccessToken();
    const driveId = await getDriveId(token);
    const { items, deltaLink } = await getDelta(
      token,
      driveId,
      storedDeltaLink,
    );
    log.push(`Delta returned ${items.length} changed item(s)`);

    const results = [];

    for (const item of items) {
      if (
        item.deleted ||
        !item.file ||
        !item.name.toLowerCase().endsWith(".pdf")
      ) {
        log.push(
          `Skipping ${item.name}: deleted=${!!item.deleted}, notFile=${!item.file}`,
        );
        continue;
      }

      const fileBuffer = await downloadFile(token, driveId, item.id);
      log.push(`Downloaded ${item.name} (${fileBuffer.length} bytes)`);

      for (const site of sites) {
        try {
          const existing = await findMediaByFilename(site, item.name);

          if (existing) {
            await deleteMedia(site, existing.id);
            log.push(`Removed old version of ${item.name} on ${site.name}`);
          }

          const wpResult = await pushFileToWordPress(
            site,
            item.name,
            fileBuffer,
          );
          log.push(
            `Uploaded ${item.name} to ${site.name}: ${wpResult.source_url}`,
          );

          results.push({
            file: item.name,
            site: site.name,
            status: "success",
            url: wpResult.source_url,
          });
        } catch (err) {
          log.push(`FAILED ${item.name} on ${site.name}: ${err.message}`);
          results.push({
            file: item.name,
            site: site.name,
            status: "failed",
            error: err.message,
          });
        }
      }
    }

    if (deltaLink) storedDeltaLink = deltaLink;

    return NextResponse.json({ ok: true, log, results });
  } catch (err) {
    log.push(`ERROR: ${err.message}`);
    return NextResponse.json(
      { ok: false, log, error: err.message },
      { status: 500 },
    );
  }
}