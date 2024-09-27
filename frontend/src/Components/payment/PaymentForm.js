import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#374151", // Adjusted for Tailwind's default gray-700
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#9CA3AF", // Tailwind's default gray-400
      },
    },
    invalid: {
      iconColor: "#EF4444", // Tailwind's red-500
      color: "#EF4444",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8000/api/vi/payment",
          {
            amount: 1000,
            id,
          }
        );
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  console.log("success", success);

  return (
    <>
      {!success ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full"
          >
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
              Payment Form
            </h2>
            <fieldset className="FormGroup">
              <div className="FormRow mb-4">
                <CardElement
                  options={CARD_OPTIONS}
                  className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </fieldset>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Pay Now
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Thank You for Your Payment!
          </h1>
          <p className="text-gray-700">
            Your transaction was successful. We appreciate your support.
          </p>
        </div>
      )}
    </>
  );
}
