import stripe from ".";

import Stripe from "stripe";

import express from "express";

export const hookHandlers = {
  "payment_intent.succeeded": async (data: Stripe.PaymentIntent) => {
    console.log("PAYMENT INTENT SUCCESS");
  },
  "payment_intent.payment_failed": async (data: Stripe.PaymentIntent) => {
    console.error("PAYMENT INTENT ERROR !!!!!!");
  },
};

export const handleStripeHook = async (
  req: express.Request,
  res: express.Response
) => {
  const signature = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(
    req["rawBody"],
    signature,
    process.env.STRIPE_HOOK_SECRET
  );

  try {
    await hookHandlers[event.type](event.data.object);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).send(`Hook Error: ${error.message}`);
  }
};
