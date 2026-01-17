import OSS from "ali-oss";
import crypto from "node:crypto";
import fs from "node:fs";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const suffixEnv = process.env.NODE_ENV ?? "goose";

const suffixEnv = "goose";

if (!suffixEnv) {
  throw new Error("Missing NODE_ENV; cannot determine upload target.");
}
const OSS_REGION = "oss-cn-shenzhen";
const OSS_BUCKET = "perfect-order";
const { OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET } = process.env;
if (!OSS_ACCESS_KEY_ID || !OSS_ACCESS_KEY_SECRET || !OSS_BUCKET) {
  throw new Error(
    "Missing OSS_ACCESS_KEY_ID / OSS_ACCESS_KEY_SECRET / OSS_BUCKET."
  );
}

const client = new OSS({
  region: OSS_REGION || "oss-cn-shenzhen",
  accessKeyId: OSS_ACCESS_KEY_ID,
  accessKeySecret: OSS_ACCESS_KEY_SECRET,
  bucket: OSS_BUCKET,
});

const DIST_DIR = path.resolve(__dirname, "dist");
const TARGET_DIR = (process.env.OSS_TARGET_DIR || `cms/${suffixEnv}`).replace(
  /^\/+/,
  ""
);

const CDN_ENDPOINT =
  process.env.OSS_CDN_ENDPOINT || "https://cdn.aliyuncs.com/";
const CDN_REFRESH_TYPE = process.env.OSS_CDN_REFRESH_TYPE || "File";
const CDN_REFRESH_URLS = (process.env.OSS_CDN_REFRESH_URLS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

async function uploadFiles(localPath, ossPath) {
  const files = fs.readdirSync(localPath);
  for (const file of files) {
    const filePath = path.join(localPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      await uploadFiles(filePath, path.posix.join(ossPath, file));
    } else {
      const ossFilePath = path.posix.join(ossPath, file);
      await client.put(ossFilePath, filePath);
      console.log(`✅ Uploaded: ${ossFilePath}`);
    }
  }
}

function percentEncode(value) {
  return encodeURIComponent(value)
    .replace(/\!/g, "%21")
    .replace(/\'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
}

function buildCdnSignature(params, accessKeySecret) {
  const sortedKeys = Object.keys(params).sort();
  const canonicalizedQueryString = sortedKeys
    .map((key) => `${percentEncode(key)}=${percentEncode(params[key])}`)
    .join("&");
  const stringToSign = `GET&%2F&${percentEncode(canonicalizedQueryString)}`;
  const signature = crypto
    .createHmac("sha1", `${accessKeySecret}&`)
    .update(stringToSign)
    .digest("base64");
  return { canonicalizedQueryString, signature };
}

async function refreshCdnCache() {
  if (!CDN_REFRESH_URLS.length) {
    console.log("⏭️  Skip CDN refresh (no URLs configured)");
    return;
  }
  const accessKeyId = OSS_ACCESS_KEY_ID;
  const accessKeySecret = OSS_ACCESS_KEY_SECRET;
  if (!accessKeyId || !accessKeySecret) {
    console.log("⏭️  Skip CDN refresh (missing access keys)");
    return;
  }
  const params = {
    Action: "RefreshObjectCaches",
    Format: "JSON",
    Version: "2018-05-10",
    AccessKeyId: accessKeyId,
    SignatureMethod: "HMAC-SHA1",
    Timestamp: new Date().toISOString(),
    SignatureVersion: "1.0",
    SignatureNonce: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    ObjectPath: CDN_REFRESH_URLS.join("\n"),
    ObjectType: CDN_REFRESH_TYPE,
  };
  const { canonicalizedQueryString, signature } = buildCdnSignature(
    params,
    accessKeySecret
  );
  const requestUrl = `${CDN_ENDPOINT}?${canonicalizedQueryString}&Signature=${percentEncode(
    signature
  )}`;
  const resBody = await new Promise((resolve, reject) => {
    https
      .get(requestUrl, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data);
          } else {
            reject(
              new Error(`CDN refresh failed (${res.statusCode}): ${data}`)
            );
          }
        });
      })
      .on("error", reject);
  });
  console.log("✅ CDN refresh success:", resBody);
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`dist directory not found: ${DIST_DIR}`);
  }
  await uploadFiles(DIST_DIR, TARGET_DIR);
  console.log("🎉 Upload finished");
  await refreshCdnCache();
}

main().catch((err) => {
  console.error("❌ Upload failed:", err.message);
  process.exit(1);
});
