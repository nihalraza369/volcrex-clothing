import { NextRequest, NextResponse } from "next/server";
import {
  parseProductInput,
  updateProduct,
  deleteProduct,
} from "@/lib/admin-products";
import { getProductById } from "@/lib/products-repo";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const product = await getProductById(params.id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json();
    const parsed = parseProductInput(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const product = await updateProduct(params.id, parsed.data);
    return NextResponse.json({ product });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await deleteProduct(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete product" },
      { status: 500 }
    );
  }
}
