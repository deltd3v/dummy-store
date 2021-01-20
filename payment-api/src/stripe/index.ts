import Stripe from "stripe";
import path from "path";
import { config as dotenvConfig } from "dotenv";

// Read environment's config file  .{NODE_ENV}.env
dotenvConfig({
  path: path.join(__dirname, "..", "..", `.${process.env.NODE_ENV}.env`),
});

export const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2020-08-27",
});

export default stripe;
