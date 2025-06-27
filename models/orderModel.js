import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  items: [{ id: String, name: String, price: Number, quantity: Number }],
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;