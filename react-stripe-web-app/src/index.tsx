import React from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import { FirebaseAppProvider } from "reactfire";
import { Elements as StripeElements } from "@stripe/react-stripe-js";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import FIRE_BASE_CONFIG from "./firebase";

const STRIPE = loadStripe(import.meta["env"].SNOWPACK_PUBLIC_STRIPE_P_KEY!)!;

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={FIRE_BASE_CONFIG}>
      <StripeElements stripe={STRIPE}>
        <App />
      </StripeElements>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals((metric) => {
  console.info(metric);
});

//@ts-ignore
if (import.meta.hot) {
  //@ts-ignore
  import.meta.hot.accept();
  console.clear();
}
