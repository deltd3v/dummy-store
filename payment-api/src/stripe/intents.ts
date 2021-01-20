import stripe from ".";

/** Create a stripe payment intent for any amount */
export async function createPaymentIntent(amount: number) {
  const intent = await stripe.paymentIntents.create({
    amount,
    currency: "EUR",
  });

  return intent;
}
