import Stripe from "stripe";
import Payment from "../model/paymentmodel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const stripe = new Stripe(process.env.STRIPE_KEY);

export const payment = catchAsync(async (req, res, next) => {
  const {
    amount,
    currency,
    paymentMethodId,
    clientId,
    engineerId,
    projectId,
    description,
  } = req.body;

  if (
    !amount ||
    !currency ||
    !paymentMethodId ||
    !clientId ||
    !engineerId ||
    !projectId
  ) {
    return next(
      new AppError("Please provide all required payment details", 400)
    );
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    payment_method: paymentMethodId,
    confirm: true,
    metadata: {
      clientId,
      engineerId,
      projectId,
      purpose: "Freelance Service Payment",
    },
  });

  if (paymentIntent.status === "succeeded") {
    let paymentRecord = await Payment.create({
      clientId,
      engineerId,
      projectId,
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      description,
    });

    paymentRecord = await paymentRecord
      .populate("clientId", "name email")
      .populate("engineerId", "name skills")
      .populate("projectId", "title budget")
      .execPopulate();

    res.status(200).json({
      status: "success",
      message: "Payment successful",
      payment: paymentRecord,
    });
  } else {
    return next(new AppError("Payment failed or requires further action", 400));
  }
});
