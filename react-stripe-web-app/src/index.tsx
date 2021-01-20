import React from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements as StripeElements } from "@stripe/react-stripe-js";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

console.log(process.env.REACT_APP_STRIPE_P_KEY);
const STRIPE = loadStripe(process.env.REACT_APP_STRIPE_P_KEY!);

ReactDOM.render(
  <React.StrictMode>
    <StripeElements stripe={STRIPE}>
      <App />
    </StripeElements>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
