import { stripe } from "./";
import { fireStore } from "../fireBase";
import Stripe from "stripe";
import { fetchOrCreateCustomer } from "./intents";
import { firestore } from "firebase-admin";

/**
 * Attaches a payment method to the Stripe customer,
 * subscribes to a Stripe plan, and saves the plan to Firestore
 */
export async function createSubscription(
  userId: string,
  plan: string,
  payment_method: string
) {
  const customer = await fetchOrCreateCustomer(userId);

  await stripe.paymentMethods.attach(payment_method, { customer: customer.id });

  await stripe.customers.update(customer.id, {
    invoice_settings: { default_payment_method: payment_method },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan }],
    expand: ["latest_invoice.payment_intent"],
  });

  const invoice = subscription.latest_invoice as Stripe.Invoice;
  const payment_intent = invoice.payment_intent as Stripe.PaymentIntent;

  if (payment_intent.status === "succeeded") {
    await fireStore
      .collection("users")
      .doc(userId)
      .set(
        {
          stripeCustomerId: customer.id,
          activePlans: firestore.FieldValue.arrayUnion(plan),
        },
        { merge: true }
      );
  }

  return subscription;
}

// Will cancel a subscription and sync data with fireStore
export async function cancelSubscription(
  userId: string,
  subscriptionId: string
) {
  const customer = await fetchOrCreateCustomer(userId);
  if (customer.metadata.firebaseUID !== userId) {
    throw Error("Firebase UID does not match Stripe Customer");
  }
  const subscription = await stripe.subscriptions.del(subscriptionId);

  if (subscription.status === "canceled") {
    await fireStore
      .collection("users")
      .doc(userId)
      .update({
        activePlans: firestore.FieldValue.arrayRemove(subscription?.id),
      });
  }

  return subscription;
}

// Fetches all subscriptions for a user
export async function fetchSubscriptions(userId: string) {
  const customer = await fetchOrCreateCustomer(userId);
  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id,
  });

  return subscriptions;
}
