/**
 * Admin authentication — password verify + signed session cookie.
 *
 * Web Crypto (crypto.subtle) use karta hai taake same code middleware
 * (Edge runtime) aur API routes (Node runtime) dono mein chal sake.
 *
 * Flow:
 *  1. Owner `/admin` pe password daalta hai (default: saim098).
 *  2. API route password verify karta hai aur ek HMAC-signed token cookie
 *     mein set karta hai.
 *  3. Middleware har admin page/API request pe woh token verify karta hai.
 */

const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "saim098";
}

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "oura-sartoria-admin-secret";
}

export const SESSION_COOKIE = "admin_session";

// --- base64url helpers (Buffer ke bina, edge-safe) -----------------
function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(base64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function hmacHex(key: string, msg: string): Promise<string> {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", k, enc.encode(msg));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export type SessionPayload = { exp: number };

export async function createSessionToken(): Promise<{
  token: string;
  maxAge: number;
}> {
  const payload: SessionPayload = { exp: Math.floor(Date.now() / 1000) + SESSION_TTL };
  const payloadStr = JSON.stringify(payload);
  const sig = await hmacHex(getSessionSecret(), payloadStr);
  return { token: `${toBase64Url(payloadStr)}.${sig}`, maxAge: SESSION_TTL };
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token || !token.includes(".")) return false;
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return false;

  const expected = await hmacHex(getSessionSecret(), fromBase64Url(payloadB64));
  if (expected !== sig) return false;

  try {
    const payload = JSON.parse(fromBase64Url(payloadB64)) as SessionPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

/** Timing-safe password compare (simple constant-time loop). */
export function verifyPassword(input: string): boolean {
  const expected = getAdminPassword();
  if (input.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < input.length; i++) {
    diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}
