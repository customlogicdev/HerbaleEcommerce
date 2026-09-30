import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { createOrderNumber } from "@/lib/utils";
import type { CartItem } from "@/types";

export const dynamic = "force-dynamic";

function toCents(value: number) {
  return Math.round(value * 100);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customerName?: string;
      email?: string;
      phone?: string;
      address?: string;
      city?: string;
      zip?: string;
      country?: string;
      notes?: string;
      items?: CartItem[];
      subtotal?: number;
      shipping?: number;
      tax?: number;
      total?: number;
    };

    if (!body.customerName || !body.email || !body.address || !body.items?.length) {
      return NextResponse.json({ ok: false, error: "Invalid order" }, { status: 400 });
    }

    const orderNumber = createOrderNumber();
    await db.insert(orders).values({
      orderNumber,
      customerName: body.customerName,
      email: body.email,
      phone: body.phone ?? "",
      address: body.address,
      city: body.city ?? "",
      zip: body.zip ?? "",
      country: body.country ?? "United States",
      notes: body.notes,
      items: body.items,
      subtotal: toCents(body.subtotal ?? 0),
      shipping: toCents(body.shipping ?? 0),
      tax: toCents(body.tax ?? 0),
      total: toCents(body.total ?? 0),
      status: "placed",
    });

    return NextResponse.json({ ok: true, orderNumber });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
