import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
