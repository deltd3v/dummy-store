import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { handleStripeHook } from "../stripe/hooks";
import { createStripeCheckOutSession } from "../stripe/sessions";

import {
  createPaymentIntent,
  createSetupIntent,
  fetchPaymentMethods,
} from "../stripe/intents";

import {
  cancelSubscription,
  createSubscription,
  fetchSubscriptions,
} from "../stripe/subscriptions";

import { decodeJwt, getAuthUser } from "./middleware/auth";

export const app = express();

app.use(
  express.json({ verify: (req, _res, buffer) => (req["rawBody"] = buffer) })
);

app.use(cors({ origin: true }));

app.use(decodeJwt);

/** Catch and throw errors when promises are broken by those damn route handlers */
export const catchAsyncErr = (callBack: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callBack(req, res).catch(next);
  };
};

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.post(
  "/checkout/",
  catchAsyncErr(async (req: Request, res: Response) => {
    const session = await createStripeCheckOutSession(req.body.line_items);
    res.send(session);
  })
);

app.post(
  "/payment/",
  catchAsyncErr(async (req: Request, res: Response) => {
    const paymentIntent = await createPaymentIntent(req.body.amount);
    res.send(paymentIntent);
  })
);

app.post("/hooks/", catchAsyncErr(handleStripeHook));

// Create a PaymentIntent
app.post(
  "/payments",
  catchAsyncErr(async ({ body }: Request, res: Response) => {
    res.send(await createPaymentIntent(body.amount));
  })
);

// Save card on the customer's stripe record
app.post(
  "/wallet",
  catchAsyncErr(async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    const setupIntent = await createSetupIntent(user.uid);
    res.send(setupIntent);
  })
);

// Fetch user's cards from stripe record
app.get(
  "/wallet",
  catchAsyncErr(async (req: Request, res: Response) => {
    const user = getAuthUser(req);

    const wallet = await fetchPaymentMethods(user.uid);
    res.send(wallet.data);
  })
);

// Create a subscription with automatic one-time charge
app.post(
  "/subscriptions/",
  catchAsyncErr(async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    const { plan, payment_method } = req.body;
    const subscription = await createSubscription(
      user.uid,
      plan,
      payment_method
    );
    res.send(subscription);
  })
);

// Fetch customer's subscriptions
app.get(
  "/subscriptions/",
  catchAsyncErr(async (req: Request, res: Response) => {
    const user = getAuthUser(req);

    const subscriptions = await fetchSubscriptions(user.uid);

    res.send(subscriptions.data);
  })
);

// Cancel a subscription
app.patch(
  "/subscriptions/:id",
  catchAsyncErr(async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    res.send(await cancelSubscription(user.uid, req.params.id));
  })
);

export default app;
