import { NextRequest, NextResponse } from "next/server";
import {
  buildJazzCashPayload,
  buildEasypaisaPayload,
  generateOrderId,
  PAYMENT_DEMO_MODE,
} from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, paymentMethod, customer } = body;

    if (!amount || !paymentMethod || !customer?.name || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { error: "Missing required order details." },
        { status: 400 }
      );
    }

    const orderId = generateOrderId();
    const origin = req.nextUrl.origin;
    const returnUrl = `${origin}/order-confirmation?orderId=${orderId}&method=${paymentMethod}`;

    // Cash on Delivery needs no gateway — order is simply recorded.
    if (paymentMethod === "cod") {
      return NextResponse.json({
        orderId,
        redirectUrl: `/order-confirmation?orderId=${orderId}&method=cod`,
      });
    }

    if (paymentMethod === "jazzcash") {
      const payload = buildJazzCashPayload({
        orderId,
        amount,
        description: "Oura Sartoria order",
        returnUrl,
      });

      // In demo mode (no real merchant credentials yet) we skip the actual
      // gateway redirect and simulate a successful payment so the flow is
      // fully testable end-to-end.
      if (PAYMENT_DEMO_MODE) {
        return NextResponse.json({
          orderId,
          demo: true,
          redirectUrl: `/order-confirmation?orderId=${orderId}&method=jazzcash&demo=1`,
        });
      }

      return NextResponse.json({ orderId, gateway: "jazzcash", ...payload });
    }

    if (paymentMethod === "easypaisa") {
      const payload = buildEasypaisaPayload({
        orderId,
        amount,
        description: "Oura Sartoria order",
        returnUrl,
      });

      if (PAYMENT_DEMO_MODE) {
        return NextResponse.json({
          orderId,
          demo: true,
          redirectUrl: `/order-confirmation?orderId=${orderId}&method=easypaisa&demo=1`,
        });
      }

      return NextResponse.json({ orderId, gateway: "easypaisa", ...payload });
    }

    return NextResponse.json({ error: "Unsupported payment method." }, { status: 400 });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
