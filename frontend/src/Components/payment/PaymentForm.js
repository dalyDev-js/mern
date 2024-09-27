import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const CARD_OPTIONS = {
  // Your existing CARD_OPTIONS
};

const isValidName = (name) => /^[A-Za-z]{3,}$/.test(name); // At least 3 characters
const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({}); // Error messages for validation
  const stripe = useStripe();
  const elements = useElements();

  const validateName = (name, type) => {
    if (!isValidName(name)) {
      setErrors((prev) => ({
        ...prev,
        [type]: `${type} must be at least 3 characters long and can only contain letters.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [type]: "" })); // Clear the error
    }
  };

  const validateEmail = () => {
    if (!isValidEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" })); // Clear the error
    }
  };

  const validateAmount = () => {
    if (amount <= 0) {
      setErrors((prev) => ({
        ...prev,
        amount: "Please enter a valid amount greater than $0.",
      }));
    } else if (amount > 10000) {
      setErrors((prev) => ({
        ...prev,
        amount: "Amount cannot exceed $10,000.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, amount: "" })); // Clear the error
    }
  };

  const handleBlur = (field) => {
    if (field === "firstName") validateName(firstName, "firstName");
    if (field === "lastName") validateName(lastName, "lastName");
    if (field === "email") validateEmail();
    if (field === "amount") validateAmount();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (
      !firstName ||
      !lastName ||
      !email ||
      !amount ||
      Object.values(errors).some((error) => error)
    ) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${firstName} ${lastName}`,
          email: email,
        },
      });

    if (stripeError) {
      console.error("Stripe error:", stripeError.message);
      toast.error(stripeError.message);
      return;
    }

    try {
      const { id } = paymentMethod;
      const response = await axios.post(
        "http://localhost:8000/api/vi/payment",
        {
          amount: parseFloat(amount),
          id,
          firstName,
          lastName,
          email,
        }
      );
      if (response.data.success) {
        setSuccess(true);
        toast.success("Payment Successful!");
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      {!success ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full"
          >
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
              Payment Form
            </h2>

            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => handleBlur("firstName")}
                className={`p-2 border rounded-lg w-full focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-amber-300"
                }`}
                style={{ height: "40px" }} // Fixed height
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => handleBlur("lastName")}
                className={`p-2 border rounded-lg w-full focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-amber-300"
                }`}
                style={{ height: "40px" }} // Fixed height
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
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
                onBlur={validateEmail}
                className={`p-2 border rounded-lg w-full focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-amber-300"
                }`}
                style={{ height: "40px" }} // Fixed height
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
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
                onBlur={validateAmount}
                className={`p-2 border rounded-lg w-full focus:outline-none focus:ring-2 ${
                  errors.amount
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-amber-300"
                }`}
                style={{ height: "40px" }} // Fixed height
                required
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            <div className="mb-6">
              <CardElement
                options={CARD_OPTIONS}
                className="p-4 border border-gray-300 rounded-lg w-full"
              />
            </div>

            <button className="w-full text-white bg-amber-300 hover:bg-amber-400 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-md px-5 py-3">
              Pay Now
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-500">Thank you for your payment.</p>
          </div>
        </div>
      )}
    </>
  );
}
