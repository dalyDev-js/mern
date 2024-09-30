import React from "react";
import { Elements } from "@stripe/react-stripe-js";
// import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment_N_stripe";

const PUBLIC_KEY =
  "pk_test_51Q1A9NKPqNhojDsBstCiHNECKYvqTV0vBcXsAtgBiPXKyUAjyrlM3Q2JLg7djaJJcBMZvy8UjlzwspgeAsEJ1n0Z00lyG096XF";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      {/* <PaymentForm /> */}
      <Payment />
    </Elements>
  );
}
