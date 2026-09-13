// src/lib/graph.js
// Handles Microsoft Graph authentication and reading changed files from SharePoint.

const TENANT_ID = process.env.SHAREPOINT_TENANT_ID;
const CLIENT_ID = process.env.SHAREPOINT_CLIENT_ID;
const CLIENT_SECRET = process.env.SHAREPOINT_CLIENT_SECRET;
const SITE_ID = process.env.SHAREPOINT_SITE_ID;
const DRIVE_NAME = process.env.SHAREPOINT_DRIVE_NAME || "Pdf_sync";

let cachedToken = null;

export async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const res = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get access token: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

async function graphFetch(path, token, init = {}) {
  const url = path.startsWith("http")
    ? path
    : `https://graph.microsoft.com/v1.0${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Graph API error ${res.status} on ${path}: ${text}`);
  }

  return res.json();
}

export async function getDriveId(token) {
  const data = await graphFetch(`/sites/${SITE_ID}/drives`, token);
  const drive = data.value.find((d) => d.name === DRIVE_NAME);
  if (!drive) {
    throw new Error(
      `Drive named "${DRIVE_NAME}" not found on this site. Available drives: ${data.value
        .map((d) => d.name)
        .join(", ")}`
    );
  }
  return drive.id;
}

export async function getDelta(token, driveId, deltaLink) {
  const path = deltaLink || `/drives/${driveId}/root/delta`;
  const data = await graphFetch(path, token);
  return {
    items: data.value,
    nextLink: data["@odata.nextLink"],
    deltaLink: data["@odata.deltaLink"],
  };
}

export async function downloadFile(token, driveId, itemId) {
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/content`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    throw new Error(`Failed to download file: ${res.status}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}