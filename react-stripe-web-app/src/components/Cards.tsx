import React, { useState, useEffect } from "react";
import { fetchPaymentApi } from "../api/paymentApi";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useUser, AuthCheck } from "reactfire";
import Stripe from "stripe";
import { SignInBtn, SignOutBtn } from "./Customer";

export function SaveCard(props) {
  const stripe = useStripe()!;
  const stripeElements = useElements();
  const user = useUser();

  const [setupIntent, setSetupIntent] = useState(
    {} as Stripe.SetupIntent | any
  );
  const [wallet, setWallet] = useState([] as Stripe.PaymentMethod[]);

  // Get the user's wallet on mount
  useEffect(() => {
    getWallet();
  }, [user]);

  // Create the setup intent
  const createSetupIntent = async () => {
    const si = await fetchPaymentApi("wallet", {});
    setSetupIntent(si);
  };

  // Handle the submission of card details
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cardElement = stripeElements!.getElement(CardElement);

    // Confirm Card Setup
    const confirmation = await stripe.confirmCardSetup(
      setupIntent!.client_secret!,
      {
        payment_method: { card: cardElement! },
      }
    )!;

    if (confirmation.error) {
      alert(confirmation.error.message);
      console.error(confirmation.error);
    } else {
      const intent = confirmation.setupIntent!;
      setSetupIntent(intent);
      await getWallet();
      alert("Your Card Has Been Stored For Future Referrences");
    }
  };

  const getWallet = async () => {
    if (user) {
      const paymentMethods = await fetchPaymentApi("wallet", { method: "GET" });
      setWallet(paymentMethods);
    }
  };

  return (
    <>
      <AuthCheck fallback={<SignInBtn />}>
        <div>
          <button onClick={createSetupIntent} hidden={setupIntent}>
            Add New Credit Card
          </button>
        </div>
        <hr />

        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Add</button>
        </form>

        <div>
          <h3>Fetch Payment Methods</h3>
          <select>
            {wallet.map((paymentSource) => (
              <CreditCard key={paymentSource!.id} card={paymentSource.card} />
            ))}
          </select>
        </div>
        <div>
          <SignOutBtn user={user} />
        </div>
      </AuthCheck>
    </>
  );
}

export function CreditCard(props: any) {
  const { brand, last4, exp_month, exp_year } = props.card;
  return (
    <option>
      <span>
        {brand} **** **** **** {last4} - {exp_month}/{exp_year}
      </span>
    </option>
  );
}
