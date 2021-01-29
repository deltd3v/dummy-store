import React from "react";

import { useState } from "react";

import { useStripe } from "@stripe/react-stripe-js";

import { fetchPaymentApi } from "../api/paymentApi";

export type CheckOutItemT = {
  name?: string;
  description?: string;
  images?: string[];
  amount?: number;
  currency?: string;
  quantity?: number;
};

export const CheckOut = () => {
  const stripe = useStripe();

  const [item, setItem] = useState({
    name: "Laptop",
    description: "Best Laptop Ever Invented.",
    images: [
      "https://cdn.verk.net/960/images/12/2_626536-4000x2902.jpeg",
      "https://cdn.verk.net/960/images/12/2_626536-4000x2902.jpeg",
    ],
    amount: 350000, // cents
    currency: "eur",
    quantity: 1,
  } as CheckOutItemT);

  const setItemQty = (newQty: CheckOutItemT["quantity"]) => {
    setItem({ ...item, quantity: Math.max(0, item.quantity! + newQty!) });
  };

  const handleCheckout = async () => {
    const { id: sessionId } = await fetchPaymentApi("checkout", {
      body: { line_items: [item] },
    });

    const { error } = await stripe!.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error(error);
      return;
    }
  };

  return (
    <>
      <h1>{item.name}</h1>
      <h3>{item.description}</h3>
      <h5>Price: {item.amount?.toString()}</h5>

      {item.images?.forEach((imgUrl, i) => {
        return (
          <img key={i * i + "#" + i * i} src={imgUrl} width="300px" alt="" />
        );
      })}

      <section>
        <h5>Quantity: {item.quantity}</h5>
        <button
          className="filled-btn rounded-sm primary"
          onClick={() => setItemQty(1)}
        >
          +
        </button>
        <button
          className="filled-btn rounded-sm  danger"
          onClick={() => setItemQty(-1)}
        >
          -
        </button>
      </section>

      <br />
      <br />
      <br />
      <button
        onClick={handleCheckout}
        className="filled-btn rounded-sm success"
      >
        Check Out
        <i className="material-icons md-light">arrow_right_alt</i>
      </button>
    </>
  );
};

export default CheckOut;
