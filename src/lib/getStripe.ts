import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe;

export default async function getStripe() {
  if (!stripePromise) {
    stripePromise = (await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    )) as Stripe;
  }
  return stripePromise;
}
