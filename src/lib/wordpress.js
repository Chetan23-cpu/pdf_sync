// src/lib/wordpress.js

export async function findMediaByFilename(site, filename) {
  const auth = Buffer.from(`${site.username}:${site.app_password}`).toString("base64");
  const nameWithoutExt = filename.replace(/\.pdf$/i, "");

  const res = await fetch(
    `${site.url}/wp-json/wp/v2/media?search=${encodeURIComponent(nameWithoutExt)}&per_page=20`,
    { headers: { Authorization: `Basic ${auth}` } }
  );
  if (!res.ok) return null;

  const results = await res.json();
  return results.find((item) =>
    item.source_url?.toLowerCase().includes(filename.toLowerCase())
  ) || null;
}

export async function deleteMedia(site, mediaId) {
  const auth = Buffer.from(`${site.username}:${site.app_password}`).toString("base64");
  await fetch(`${site.url}/wp-json/wp/v2/media/${mediaId}?force=true`, {
    method: "DELETE",
    headers: { Authorization: `Basic ${auth}` },
  });
}

export async function pushFileToWordPress(site, fileName, fileBuffer, mimeType = "application/pdf") {
  const auth = Buffer.from(`${site.username}:${site.app_password}`).toString("base64");

  const res = await fetch(`${site.url}/wp-json/wp/v2/media`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": mimeType,
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
    body: fileBuffer,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`WordPress upload failed (${site.name}): ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}