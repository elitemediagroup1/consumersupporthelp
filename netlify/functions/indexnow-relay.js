// IndexNow relay for consumersupporthelp.com
// Accepts {urls:[...]} or {urlList:[...]} from browser; injects host + key server-side
// before forwarding to Bing IndexNow API.

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "f7af8f612e05405fa52b8180568a5874";
const INDEXNOW_HOST = process.env.INDEXNOW_HOST || "consumersupporthelp.com";
const KEY_LOCATION = "https://" + INDEXNOW_HOST + "/" + INDEXNOW_KEY + ".txt";

exports.handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: cors, body: "POST only" };
  try {
    const endpoint = (event.queryStringParameters && event.queryStringParameters.endpoint) || "https://api.indexnow.org/indexnow";
    let incoming = {};
    try { incoming = JSON.parse(event.body || "{}"); } catch (e) { incoming = {}; }
    const urlList = Array.isArray(incoming.urlList) ? incoming.urlList
                  : Array.isArray(incoming.urls) ? incoming.urls
                  : [];
    if (!urlList.length) {
      return { statusCode: 400, headers: { ...cors, "Content-Type": "application/json" }, body: JSON.stringify({ error: "urls or urlList array is required" }) };
    }
    const payload = {
      host: incoming.host || INDEXNOW_HOST,
      key: incoming.key || INDEXNOW_KEY,
      keyLocation: incoming.keyLocation || KEY_LOCATION,
      urlList: urlList
    };
    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload)
    });
    const text = await r.text();
    return {
      statusCode: 200,
      headers: { ...cors, "Content-Type": "application/json" },
      body: JSON.stringify({ upstreamStatus: r.status, upstreamStatusText: r.statusText, upstreamBody: text, endpoint, submittedCount: urlList.length })
    };
  } catch (e) {
    return { statusCode: 500, headers: { ...cors, "Content-Type": "application/json" }, body: JSON.stringify({ error: e.message }) };
  }
};
