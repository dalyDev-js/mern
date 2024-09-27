import React, { useState } from "react";
import { Accordion } from "flowbite-react";
import { Link } from "react-router-dom";

import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

// //////////////////////////////////////////  VALID PAYMANT //////////////////////////////////

function Payment() {
  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Cairo");

  // Error state
  const [errors, setErrors] = useState({});

  const [donationAmount, setDonationAmount] = useState(0);
  const [stripeError, setStripeError] = useState(null);
  const elements = useElements();
  const stripe = useStripe();

  const handleStripePayment = async (event) => {
    event.preventDefault();
    // Check if donation amount is provided
    if (!donationAmount) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please enter a donation amount.",
        life: 3000,
      });
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setStripeError(error.message);
      } else {
        toast.current.show({
          severity: "success",
          summary: "Thank you for your donation!",
          detail: `You have donated by ${donationAmount} successfully!`,
          life: 3000,
        });
        setDonationAmount("");
      }
    }
  };

  // Function to format card number with hyphens
  const formatCardNumber = (value) => {
    // Remove any non-digit characters (including existing hyphens)
    const onlyNumbers = value.replace(/\D/g, "");

    // Add hyphen after every 4 digits
    return onlyNumbers.replace(/(\d{4})(?=\d)/g, "$1-");
  };

  // Handle card number input change
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    // Validate card number (strip hyphens for validation)
    const cardNumberNoHyphen = cardNumber.replace(/\D/g, ""); // Remove hyphens for validation
    if (cardNumberNoHyphen.length === 0) {
      newErrors.cardNumber = "Card Number is required";
    } else if (cardNumberNoHyphen.length !== 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    // Validate first and last name
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (firstName.length < 3) {
      newErrors.firstName = "First name must be at least 3 characters";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (lastName.length < 3) {
      newErrors.lastName = "Last name must be at least 3 characters";
    }

    // Validate expiration date
    const expDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{4})$/; // Regex to match MM/YYYY format
    if (!expirationDate) {
      newErrors.expirationDate = "Expiration date is required";
    } else if (!expDateRegex.test(expirationDate)) {
      newErrors.expirationDate = "Expiration date must be in MM/YYYY format";
    } else {
      const [expMonth, expYear] = expirationDate.split("/").map(Number);
      const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed
      const currentYear = new Date().getFullYear();

      if (
        expYear < currentYear ||
        (expYear === currentYear && expMonth < currentMonth)
      ) {
        newErrors.expirationDate = "Expiration date must be in the future";
      }
    }

    // Validate CVV (3 or 4 digits)
    if (cvv.length === 0) {
      newErrors.cvv = "CVV code is required";
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "Please enter a valid CVV (3-4 digits)";
    }

    // Validate address
    if (!address.trim()) {
      newErrors.address = "Address is required";
    } else if (address.length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", {
        cardNumber,
        firstName,
        lastName,
        expirationDate,
        cvv,
        address,
        city,
      });
    }
  };

  return (
    <>
      <div className="bg-gray-50 p-6 my-28 flex flex-col md:flex-row gap-1 max-w-5xl mx-auto ">
        {/* Left Section  */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md ">
          <form onSubmit={handleSubmit}>
            {/* text  */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-black">
                <h2 className="text-2xl font-semibold mb-4">
                  Select a billing method
                </h2>
              </span>
              <button
                type="button"
                className=" w-32 h-12 mb-5 text-black border-2 border-amber-300 hover:bg-amber-400 focus:ring-4 focus:ring-amber-300 font-medium rounded-full text-md px-5 py-2.5"
              >
                <Link to={"/client"}>Cancel</Link>
              </button>
            </div>
            <p className="text-gray-500 mb-4">
              This will be your primary billing method across all contracts,
              account activity, and subscriptions.
            </p>
            {/* dropdown */}
            <form onSubmit={handleStripePayment}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter your donation amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Credit Card Information:</label>
                <div className="border p-3 rounded">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          color: "#000",
                          fontSize: "16px",
                          fontFamily: "Arial, sans-serif",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#fa755a",
                          iconColor: "#fa755a",
                        },
                      },
                    }}
                  />
                  {stripeError && (
                    <div className="text-danger mt-2">{stripeError}</div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className={`btn btn-primary w-100`}
                disabled={!stripe}
              >
                Donate with Stripe
              </button>
            </form>
            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="w-40 mb-5 text-black bg-amber-300 hover:bg-amber-400 focus:ring-4 focus:ring-amber-300 font-medium rounded-full text-md px-5 py-2.5 me-2 dark:bg-amber-600 dark:hover:bg-amber-300 focus:outline-none dark:focus:ring-amber-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Right Section  */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          {/* photo */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://www.perfocal.com/blog/content/images/size/w1140/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
              alt="User photo"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-md font-semibold">Hire Ahmed Mahmood</h3>
              <p className="text-gray-500">For: Enter project title</p>
            </div>
          </div>
          {/* text deposit */}
          <div className="border-t border-gray-300 pt-4">
            <span className="text-gray-600">Escrow deposit</span>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Estimated Total</span>

              <span className="font-semibold">$50.00</span>
            </div>
            <hr className=" border-gray-300 pt-4"></hr>
            <p className="text-sm text-gray-500 mb-14">
              You'll be charged up to a
              <a
                href="#"
                class="font-medium pl-1 text-amber-300 dark:text-amber-400 hover:underline"
              >
                5% marketplace fee
              </a>
              . Taxes may also apply.
            </p>

            <button
              href="#"
              className=" w-full mb-5 text-black bg-amber-300 hover:bg-amber-400 focus:ring-4 focus:ring-amber-300 font-medium rounded-full text-md px-5 py-2.5 me-2 dark:bg-amber-600 dark:hover:bg-amber-300 focus:outline-none dark:focus:ring-amber-300"
            >
              Fund Contract & Hire
            </button>
            {/* icon */}
            <span className="flex gap-2 pl-5">
              <svg
                class="w-6 h-6 text-amber-300 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                <path
                  fill-rule="evenodd"
                  d="M9.896 3.051a2.681 2.681 0 0 1 4.208 0c.147.186.38.282.615.255a2.681 2.681 0 0 1 2.976 2.975.681.681 0 0 0 .254.615 2.681 2.681 0 0 1 0 4.208.682.682 0 0 0-.254.615 2.681 2.681 0 0 1-2.976 2.976.681.681 0 0 0-.615.254 2.682 2.682 0 0 1-4.208 0 .681.681 0 0 0-.614-.255 2.681 2.681 0 0 1-2.976-2.975.681.681 0 0 0-.255-.615 2.681 2.681 0 0 1 0-4.208.681.681 0 0 0 .255-.615 2.681 2.681 0 0 1 2.976-2.975.681.681 0 0 0 .614-.255ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                  clip-rule="evenodd"
                />
                <path d="M5.395 15.055 4.07 19a1 1 0 0 0 1.264 1.267l1.95-.65 1.144 1.707A1 1 0 0 0 10.2 21.1l1.12-3.18a4.641 4.641 0 0 1-2.515-1.208 4.667 4.667 0 0 1-3.411-1.656Zm7.269 2.867 1.12 3.177a1 1 0 0 0 1.773.224l1.144-1.707 1.95.65A1 1 0 0 0 19.915 19l-1.32-3.93a4.667 4.667 0 0 1-3.4 1.642 4.643 4.643 0 0 1-2.53 1.21Z" />
              </svg>

              {/* text */}

              <p class="text-gray-500 dark:text-gray-400">
                Handesly Payment Protection
              </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
