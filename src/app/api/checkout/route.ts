import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const stripeKey = process.env.STRIPE_SECRET_KEY!;
  const priceId = process.env.STRIPE_PRICE_ID!;

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        mode: "payment",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`,
      }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Stripe API error:", JSON.stringify(data));
      return NextResponse.json({ error: data.error?.message || "Stripe error" }, { status: 500 });
    }

    if (!data.url) {
      return NextResponse.json({ error: "No checkout URL returned" }, { status: 500 });
    }

    return NextResponse.redirect(data.url, 303);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
