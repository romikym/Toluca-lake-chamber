import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

/** Stripe client — null when no key is configured (keyless dev/demo mode). */
export const stripe = key ? new Stripe(key) : null;

export const stripeEnabled = Boolean(key);
