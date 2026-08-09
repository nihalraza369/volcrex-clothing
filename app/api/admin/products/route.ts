import { NextRequest, NextResponse } from "next/server";
import {
  listProductsForAdmin,
  parseProductInput,
  createProduct,
} from "@/lib/admin-products";

export async function GET() {
  try {
    const products = await listProductsForAdmin();
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = parseProductInput(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const product = await createProduct(parsed.data);
    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create product" },
      { status: 500 }
    );
  }
}
