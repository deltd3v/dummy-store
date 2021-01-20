import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CheckOut from "./components/CheckOut";
import CheckOutFail from "./components/CheckOutFail";
import CheckOutSuccess from "./components/CheckOutSuccess";
import CheckOutPayments from "./components/CheckOutPayments";

import "./App.css";
/*
 
import { Checkout, CheckoutSuccess, CheckoutFail } from "./Checkout";

import Payments from "./Payments";
import Customers from "./Customers";
import Subscriptions from "./Subscriptions";
 */

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar-nav">
            <li>
              <i aria-label="emoji" role="img" className="material-icons md-18">
                home
              </i>
              <Link to="/">Home</Link>
            </li>
            <li>
              <i aria-label="emoji" role="img" className="material-icons md-18">
                shopping_cart
              </i>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>
              <i aria-label="emoji" role="img" className="material-icons md-18">
                credit_card
              </i>

              <Link to="/payments">Payments</Link>
            </li>
            <li>
              <i
                aria-label="emoji"
                role="img"
                className="material-icons md-dark md-18"
              >
                group
              </i>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <i
                aria-label="emoji"
                role="img"
                className="material-icons md-dark md-18"
              >
                style
              </i>
              <Link id="subscriptions" to="/subscriptions">
                Subscriptions
              </Link>
            </li>
          </ul>
        </nav>

        <main>
          <Switch>
            <Route path="/checkout">
              {/*
              <h1>checkout</h1>
              */}
              <CheckOut />
            </Route>
            <Route path="/payments">
              {/*
                <h1>payments</h1>
              */}
              <CheckOutPayments />
            </Route>
            <Route path="/customers">
              <h1>customers</h1>
              {/*
                <Customers />
              */}
            </Route>
            <Route path="/subscriptions">
              <h1>subscriptions</h1>
              {/*
                <Subscriptions />
              */}
            </Route>
            <Route path="/success">
              {/*
              <h1>Check Out Success</h1>
              */}
              <CheckOutSuccess />
            </Route>
            <Route path="/check-out-failed">
              {/*
              <h1>Check Out Failed</h1>
              */}
              <CheckOutFail />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <h2>Stripe React + Node.js</h2>
    </>
  );
}

export default App;
