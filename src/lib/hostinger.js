const HOSTINGER_API_TOKEN = process.env.HOSTINGER_API_TOKEN;
const HOSTINGER_USERNAME = process.env.HOSTINGER_USERNAME;

export async function purgeLiteSpeedCache(wordpressInstallationId) {
  const res = await fetch(
    `https://developers.hostinger.com/api/hosting/v1/accounts/${HOSTINGER_USERNAME}/wordpress/${wordpressInstallationId}/litespeed-cache/purge`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HOSTINGER_API_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cache purge failed: ${res.status} ${text}`);
  }

  return res.json();
}