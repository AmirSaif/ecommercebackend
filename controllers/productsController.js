import { Router } from "express";

const router = Router();

router.get("/products", (req, res) => {
  const products = [
    { id: 'p1', name: 'T-shirt', price: 499, currency: 'inr' },
    { id: 'p2', name: 'Mug', price: 199, currency: 'inr' },
    { id: 'p3', name: 'Shirt', price: 499, currency: 'inr' },
    { id: 'p4', name: 'Joystick', price: 199, currency: 'inr' },
    { id: 'p5', name: 'Keyboard', price: 499, currency: 'inr' },
    { id: 'p6', name: 'Mouse', price: 199, currency: 'inr' }
  ];
  res.json(products);
});

export default router;
