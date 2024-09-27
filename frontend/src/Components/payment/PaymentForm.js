import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  // Your existing CARD_OPTIONS
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(""); // State for amount
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: name, // Include name in billing details
        email: email, // Include email in billing details
      },
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8000/api/vi/payment",
          {
            amount: parseInt(amount, 10), // Send amount to your server
            id,
            name, // Send name to your server
            email, // Send email to your server
          }
        );
        if (response.data.success) {
          setSuccess(true);
        }
      } catch (error) {
        console.error("Payment error:", error);
      }
    } else {
      console.error("Stripe error:", error.message);
    }
  };

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

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>

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
