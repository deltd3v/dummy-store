import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { handleStripeHook } from "../stripe/hooks";
import { createPaymentIntent } from "../stripe/intents";

import { createStripeCheckOutSession } from "../stripe/sessions";
export const app = express();

app.use(
  express.json({ verify: (req, _res, buffer) => (req["rawBody"] = buffer) })
);

app.use(cors({ origin: true }));

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

export default app;
