import Stripe from "stripe";
import stripe from ".";

export type CheckOutItemT = Stripe.Checkout.SessionCreateParams.LineItem;

export const WEB_APP_URL = process.env.WEB_APP_URL!;

/** Create's a stripe check out session which expects some items for checking out  */
export async function createStripeCheckOutSession(
  checkOutItems: CheckOutItemT[]
) {
  const checkOutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: checkOutItems,
    success_url: `${WEB_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${WEB_APP_URL}/check-out-fail`,
  });
  return checkOutSession;
}
