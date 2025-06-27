import { Router } from "express";
import Order from "../models/orderModel.js";

const router = Router();

router.post("/checkout", async (req, res) => {
  const { items } = req.body;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  await Order.create({
    userId: req.user._id,
    items,
    createdAt: new Date()
  });

  res.json({ message: `Checkout success! Total amount: ₹${total}` });
});

export default router;