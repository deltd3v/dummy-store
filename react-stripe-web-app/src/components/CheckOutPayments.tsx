import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Stripe from "stripe";
import { useState } from "react";
import { fetchPaymentApi } from "../api/paymentApi";

export const CheckOutPayments = () => {
  const stripe = useStripe();
  const stripeElements = useElements();

  const [amount, setAmount] = useState(0);
  const [paymentIntent, setPaymentIntent] = useState(
    {} as Stripe.PaymentIntent | any
  );

  const handleCreatePaymentIntent = async () => {
    const newValue = Math.min(Math.max(amount, 5), 9999999);
    setAmount(newValue);

    const paymentIntent = await fetchPaymentApi("payment", {
      body: { amount: newValue },
    });

    setPaymentIntent(paymentIntent);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cardElement = stripeElements?.getElement(CardElement);

    const {
      error,
      paymentIntent: updatedPaymentIntent,
    } = await stripe!.confirmCardPayment(paymentIntent!.client_secret!, {
      payment_method: { card: cardElement! },
    });

    if (error) {
      console.error(error);
      error.payment_intent && setPaymentIntent(error.payment_intent);
    } else {
      setPaymentIntent(updatedPaymentIntent!);
    }
  };

  return (
    <>
      <div>
        <input
          type="number"
          value={amount}
          disabled={paymentIntent}
          onChange={(e) => setAmount(+e.target.value)}
        />

        <button
          className="rounded-sm filled-btn primary"
          onClick={handleCreatePaymentIntent}
          disabled={amount <= 0}
          hidden={paymentIntent}
        >
          Pay € ${(amount / 100).toFixed(2)}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" className="filled-btn rounded-sm primary">
          Pay
        </button>
      </form>
    </>
  );
};

export default CheckOutPayments;
