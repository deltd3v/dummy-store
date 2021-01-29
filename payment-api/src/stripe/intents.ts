import stripe from ".";
import Stripe from "stripe";
import { fireStore } from "../fireBase";

/** Create a stripe payment intent for any amount */
export async function createPaymentIntent(amount: number) {
  const intent = await stripe.paymentIntents.create({
    amount,
    currency: "EUR",
  });

  return intent;
}

// Create's and charges payment intent for existing & saved customer
export async function createPaymentIntentAndCharge(
  amount: number,
  customer: string,
  payment_method: string
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    customer,
    payment_method,
    currency: "EUR",
    confirm: true,
    off_session: true,
  });

  return paymentIntent;
}

// Creates an intent to save card credentials for later use
export async function createSetupIntent(userId: string) {
  const customer = await fetchOrCreateCustomer(userId);

  return stripe.setupIntents.create({
    customer: customer.id,
  });
}

// Fetch payment methods for the user
export async function fetchPaymentMethods(userId: string) {
  const customer = await fetchOrCreateCustomer(userId);

  return stripe.paymentMethods.list({
    customer: customer.id,
    type: "card",
  });
}

// Fetch stripe customer or create a new record
export async function fetchOrCreateCustomer(
  userId: string,
  params?: Stripe.CustomerCreateParams
) {
  const userSnap = await fireStore.collection("users").doc(userId).get();

  const { stripeCustomerId, email } = userSnap.data() || {};

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email,
      metadata: {
        firebaseUID: userId,
      },
      ...params,
    });

    await userSnap.ref.update({ stripeCustomerId: customer.id });

    return customer;
  } else {
    return (await stripe.customers.retrieve(
      stripeCustomerId
    )) as Stripe.Customer;
  }
}
