import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authController from "./controllers/authController.js";
import cookieParser from "cookie-parser";
import productsController from "./controllers/productsController.js";
import authMiddleware from "./middleware/authMiddleware.js";
import connectDB from "./db.js";
import path from "path";
import checkoutController from "./controllers/dummyCheckoutController.js";
import Order from "./models/orderModel.js";

//import checkoutController from "./controllers/checkoutController.js";

//dotenv.config({path: path.resolve(process.cwd(),'commerceBackend','.env')});
dotenv.config();
const app = express();

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
));
app.use(cookieParser())

app.use(express.json());
await connectDB();
app.use("/api/auth", authController);
app.use("/api/list", productsController);
app.use("/api/secure",authMiddleware, checkoutController);
app.get("/api/secure/orders", authMiddleware, async (req, res) => {
  const orders = await Order.find({userId: req.user._id});
  res.json(orders);
});
//app.post("/api/checkout", authMiddleware, checkoutController);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});