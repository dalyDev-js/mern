import React, { useState } from "react";
import { Accordion } from "flowbite-react";
import { Link } from "react-router-dom";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

// //////////////////////////////////////////  VALID PAYMANT with stripe  //////////////////////////////////

const CARD_OPTIONS = {
  // Your existing CARD_OPTIONS
};

const isValidName = (name) => /^[A-Za-z]{3,}$/.test(name); // At least 3 characters
const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
function Payment() {
  // Form state
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Cairo");

  // Error state
  const [errors, setErrors] = useState({});
  // nada
  // // Function to format card number with hyphens
  // const formatCardNumber = (value) => {
  //   // Remove any non-digit characters (including existing hyphens)
  //   const onlyNumbers = value.replace(/\D/g, "");

  //   // Add hyphen after every 4 digits
  //   return onlyNumbers.replace(/(\d{4})(?=\d)/g, "$1-");
  // };

  // // Handle card number input change
  // const handleCardNumberChange = (e) => {
  //   const formattedValue = formatCardNumber(e.target.value);
  //   setCardNumber(formattedValue);
  // };

  // // Validation logic
  // const validateForm = () => {
  //   const newErrors = {};

  //   // Validate card number (strip hyphens for validation)
  //   const cardNumberNoHyphen = cardNumber.replace(/\D/g, ""); // Remove hyphens for validation
  //   if (cardNumberNoHyphen.length === 0) {
  //     newErrors.cardNumber = "Card Number is required";
  //   } else if (cardNumberNoHyphen.length !== 16) {
  //     newErrors.cardNumber = "Please enter a valid 16-digit card number";
  //   }

  //   // Validate first and last name
  //   if (!firstName.trim()) {
  //     newErrors.firstName = "First name is required";
  //   } else if (firstName.length < 3) {
  //     newErrors.firstName = "First name must be at least 3 characters";
  //   }
  //   if (!lastName.trim()) {
  //     newErrors.lastName = "Last name is required";
  //   } else if (lastName.length < 3) {
  //     newErrors.lastName = "Last name must be at least 3 characters";
  //   }

  //   // Validate expiration date
  //   const expDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{4})$/; // Regex to match MM/YYYY format
  //   if (!expirationDate) {
  //     newErrors.expirationDate = "Expiration date is required";
  //   } else if (!expDateRegex.test(expirationDate)) {
  //     newErrors.expirationDate = "Expiration date must be in MM/YYYY format";
  //   } else {
  //     const [expMonth, expYear] = expirationDate.split("/").map(Number);
  //     const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed
  //     const currentYear = new Date().getFullYear();

  //     if (
  //       expYear < currentYear ||
  //       (expYear === currentYear && expMonth < currentMonth)
  //     ) {
  //       newErrors.expirationDate = "Expiration date must be in the future";
  //     }
  //   }

  //   // Validate CVV (3 or 4 digits)
  //   if (cvv.length === 0) {
  //     newErrors.cvv = "CVV code is required";
  //   } else if (!/^\d{3,4}$/.test(cvv)) {
  //     newErrors.cvv = "Please enter a valid CVV (3-4 digits)";
  //   }

  //   // Validate address
  //   if (!address.trim()) {
  //     newErrors.address = "Address is required";
  //   } else if (address.length < 10) {
  //     newErrors.address = "Address must be at least 10 characters";
  //   }

  //   setErrors(newErrors);

  //   // Return true if there are no errors
  //   return Object.keys(newErrors).length === 0;
  // };

  //  // Handle form submission
  //  const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     // Form is valid, proceed with submission
  //     console.log("Form submitted:", {
  //       cardNumber,
  //       firstName,
  //       lastName,
  //       expirationDate,
  //       cvv,
  //       address,
  //       city,
  //     });
  //   }
  // };
  const validateName = (name, type) => {
    if (!isValidName(name)) {
      setErrors((prev) => ({
        ...prev,
        [type]: `${type} must be at least 3 characters long and can only contain letters.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const validateEmail = () => {
    if (!isValidEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
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
      setErrors((prev) => ({ ...prev, amount: "" }));
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
        <div className="bg-gray-50 p-6 my-28 flex flex-col md:flex-row gap-1 max-w-5xl mx-auto ">
          {/* Left Section  */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md ">
            <form onSubmit={handleSubmit}>
              {/* text  */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-black">
                  <h2 className="text-2xl font-semibold mb-4">Payment Form</h2>
                </span>
                <button
                  type="button"
                  className=" w-32 h-12 mb-5 text-black border-2 border-amber-300 hover:bg-amber-400 focus:ring-4 focus:ring-amber-300 font-medium rounded-full text-md px-5 py-2.5"
                >
                  <Link to={"/client"}>Cancel</Link>
                </button>
              </div>
              <p className="text-gray-500 mb-4">
                You'll be charged up to a 5% marketplace fee. Taxes may also
                apply.
              </p>
              {/* dropdown */}
              <Accordion>
                <Accordion.Panel>
                  <Accordion.Title className="p-3">
                    {/* icon */}
                    <span className="flex gap-2 ">
                      <svg
                        class="w-8 h-8 text-amber-400 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Z"
                        />
                        <path
                          fill="#ffffff"
                          d="M15.643 9.382a3.314 3.314 0 0 0-1.158-.2c-1.276 0-2.177.643-2.184 1.566-.008.678.64 1.06 1.131 1.286.504.233.672.38.67.588-.003.317-.402.46-.772.46-.51 0-.789-.07-1.217-.248l-.159-.075-.18 1.063c.31.13.869.24 1.446.25 1.357 0 2.244-.64 2.255-1.621.01-.542-.34-.951-1.079-1.29-.449-.219-.727-.365-.727-.588 0-.197.238-.408.737-.408.332-.008.661.055.967.183l.12.053.181-1.026-.031.007Zm3.312-.114h-.997c-.31 0-.544.085-.68.393l-1.917 4.345h1.356l.272-.713 1.656.002c.039.166.158.71.158.71H20l-1.045-4.737Zm-8.49-.04h1.294l-.809 4.74H9.659l.807-4.742v.002Zm-3.282 2.613.134.658 1.264-3.231h1.37l-2.035 4.731H6.549L5.432 9.993a.27.27 0 0 0-.119-.159 5.543 5.543 0 0 0-1.27-.47l.018-.1h2.081c.283.012.51.1.586.402l.454 2.177.001-.002Zm10.177.483.515-1.326c-.006.014.106-.273.171-.451l.089.409.3 1.367h-1.076Z"
                        />
                      </svg>
                      {/* text */}
                      <p class="text-black dark:text-gray-400">Payment Card</p>
                      <p class="text-xs pt-1  text-gray-500 dark:text-gray-400">
                        Visa,MasterCard
                      </p>
                    </span>
                  </Accordion.Title>
                  <Accordion.Content>
                    {/* Card Details */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <div class="relative">
                        <CardElement
                          options={CARD_OPTIONS}
                          className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:border-amber-300 focus:ring-amber-300 sm:text-sm"
                        />
                        {/* icon visa */}
                        {/* <div class=" absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                          <svg
                            fill="none"
                            class="h-6 text-amber-400 dark:text-white"
                            viewBox="0 0 36 21"
                          >
                            <path
                              fill="currentColor"
                              d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z"
                            />
                          </svg>
                        </div> */}
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          type="text"
                          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-amber-300 focus:ring-amber-300 sm:text-sm${
                            errors.firstName
                              ? "border-red-500 focus:ring-red-400"
                              : "border-gray-300 focus:ring-amber-300"
                          }`}
                          id="firstName"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          onBlur={() => handleBlur("firstName")}
                          placeholder="First Name"
                          required
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-amber-300 focus:ring-amber-300 sm:text-sm${
                            errors.lastName
                              ? "border-red-500 focus:ring-red-400"
                              : "border-gray-300 focus:ring-amber-300"
                          }`}
                          id="lastName"
                          name="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          onBlur={() => handleBlur("lastName")}
                          placeholder="LastName"
                          required
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email stripe */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateEmail}
                        placeholder="Email"
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-amber-300 focus:ring-amber-300 sm:text-sm ${
                          errors.email
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-amber-300"
                        }`}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>

                    {/* amount */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Amount
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onBlur={validateAmount}
                        placeholder="Amount"
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-amber-300 focus:ring-amber-300 sm:text-sm  ${
                          errors.amount
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-amber-300"
                        }`}
                        required
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.amount}
                        </p>
                      )}
                    </div>

                    {/* Billing Address */}
                    <div className="mb-6">
                      <h2 className="text-lg font-bold mb-2">
                        Billing Address
                      </h2>

                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <select
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-amber-300 focus:ring-amber-300 sm:text-sm"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option>Cairo</option>
                        <option>Beni Suef</option>
                        <option>Minya</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>

                      <textarea
                        id="message"
                        rows="4"
                        class=" mt-1 block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:border-amber-300 focus:ring-amber-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your Address here..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></textarea>
                      {errors.address && (
                        <p className="text-red-500 text-sm">{errors.address}</p>
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
                <hr />
                {/*  PayPal Section */}
              </Accordion>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                {/* <button
                  type="submit"
                  className="w-40 mb-5 text-black bg-amber-300 hover:bg-amber-400 focus:ring-4 focus:ring-amber-300 font-medium rounded-full text-md px-5 py-2.5 me-2 dark:bg-amber-600 dark:hover:bg-amber-300 focus:outline-none dark:focus:ring-amber-300"
                >
                  Pay Now nn
                </button> */}
                {/* stripe w-full */}
                <button className="w-40  text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-md px-5 py-3 transition duration-300 ease-in-out">
                  Pay Now
                </button>
              </div>
            </form>
          </div>

          {/* Right Section  */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
            {/* photo */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7U_ef87Q7CQ1Fx_khkPq-y9IfPmBWrMZ6ig&s"
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
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-500">Thank you for your payment.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Payment;
