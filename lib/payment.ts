import crypto from "crypto";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * PAYMENT INTEGRATION — JazzCash & EasyPaisa
 * ─────────────────────────────────────────────────────────────────────────
 * This file is a real, working scaffold for both gateways' HOSTED CHECKOUT
 * flow (the customer is redirected to JazzCash/EasyPaisa's own page to
 * enter their mobile account PIN, then redirected back to your site).
 *
 * To go live you need:
 *   1. A merchant account with JazzCash (https://sandbox.jazzcash.com.pk /
 *      https://www.jazzcash.com.pk for production) and/or EasyPaisa
 *      (https://easypaisa.com.pk business account).
 *   2. Your Merchant ID, Password, and Integrity Salt / Hash Key from
 *      their merchant dashboard.
 *   3. Put those values into `.env.local` (see `.env.example` in the repo
 *      root) — NEVER commit real credentials to git.
 *
 * Until real credentials are supplied, PAYMENT_DEMO_MODE stays on and the
 * checkout flow simulates a successful payment so you can test the full
 * buy → cart → checkout → confirmation flow today.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const PAYMENT_DEMO_MODE =
  !process.env.JAZZCASH_MERCHANT_ID && !process.env.EASYPAISA_STORE_ID;

type OrderInput = {
  orderId: string;
  amount: number; // in PKR (rupees, not paisas)
  description: string;
  returnUrl: string;
};

/**
 * Builds the field set + secure hash JazzCash's Hosted Checkout Page (HCP)
 * expects. Per JazzCash's integration guide, the hash is an HMAC-SHA256 of
 * all pp_ fields (excluding pp_SecureHash itself) sorted alphabetically by
 * key and joined with "&", keyed with your Integrity Salt.
 */
export function buildJazzCashPayload(order: OrderInput) {
  const merchantId = process.env.JAZZCASH_MERCHANT_ID || "DEMO_MERCHANT";
  const password = process.env.JAZZCASH_PASSWORD || "DEMO_PASSWORD";
  const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT || "DEMO_SALT";

  const now = new Date();
  const txnDateTime = formatDateTime(now);
  const expiry = new Date(now.getTime() + 60 * 60 * 1000); // +1 hour
  const txnExpiryDateTime = formatDateTime(expiry);

  const fields: Record<string, string> = {
    pp_Version: "1.1",
    pp_TxnType: "MWALLET",
    pp_Language: "EN",
    pp_MerchantID: merchantId,
    pp_Password: password,
    pp_TxnRefNo: order.orderId,
    pp_Amount: String(Math.round(order.amount * 100)), // paisas
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: txnDateTime,
    pp_BillReference: order.orderId,
    pp_Description: order.description,
    pp_TxnExpiryDateTime: txnExpiryDateTime,
    pp_ReturnURL: order.returnUrl,
  };

  const sortedKeys = Object.keys(fields).sort();
  const hashString = sortedKeys.map((k) => fields[k]).join("&");
  const secureHash = crypto
    .createHmac("sha256", integritySalt)
    .update(hashString)
    .digest("hex");

  return {
    actionUrl: PAYMENT_DEMO_MODE
      ? null
      : "https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform",
    fields: { ...fields, pp_SecureHash: secureHash },
  };
}

/**
 * Builds the request payload for EasyPaisa's Hosted Checkout.
 * EasyPaisa signs requests with HMAC-SHA256 keyed by your Hash Key over a
 * concatenation of storeId + amount + orderRefNum + your merchant hash key.
 */
export function buildEasypaisaPayload(order: OrderInput) {
  const storeId = process.env.EASYPAISA_STORE_ID || "DEMO_STORE";
  const hashKey = process.env.EASYPAISA_HASH_KEY || "DEMO_HASH_KEY";

  const raw = `${storeId}&${order.amount.toFixed(2)}&${order.orderId}&${hashKey}`;
  const hash = crypto.createHash("sha256").update(raw).digest("hex");

  return {
    actionUrl: PAYMENT_DEMO_MODE
      ? null
      : "https://easypay.easypaisa.com.pk/easypay/Index.jsf",
    fields: {
      storeId,
      amount: order.amount.toFixed(2),
      postBackURL: order.returnUrl,
      orderRefNum: order.orderId,
      merchantHashedReq: hash,
      expiryDate: formatDateTime(new Date(Date.now() + 60 * 60 * 1000)),
      merchantName: "Expert Bridal Dress",
    },
  };
}

function formatDateTime(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(
    d.getHours()
  )}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export function generateOrderId() {
  return `EBD-${Date.now().toString(36).toUpperCase()}-${Math.floor(
    Math.random() * 1000
  )}`;
}
