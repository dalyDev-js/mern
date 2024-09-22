import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: [true, 'A payment must belong to a client'],
  },
  engineerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Engineer', 
    required: [true, 'A payment must belong to an engineer'],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: [true, 'A payment must belong to a project'],
  },
  amount: {
    type: Number,
    required: [true, 'A payment must have an amount'],
  },
  currency: {
    type: String,
    enum: ['usd', 'eur', 'gbp'], 
    required: [true, 'A payment must have a currency'],
  },
  paymentIntentId: {
    type: String,
    required: [true, 'A payment must have a Stripe paymentIntentId'],
  },
  status: {
    type: String,
    enum: ['succeeded', 'pending', 'failed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
});

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;