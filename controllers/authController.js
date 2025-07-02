import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //console.log(user.email,user.password);

  if (!user) {
    res.status(401).send({ message: "You need to register first!" });
    return;
  }

  if (email === user.email && password === user.password) {
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      "maxAge": 60 * 60 * 60 * 60 * 1000
    });
    res.status(200).send({ message : "Logged in successfully" });
  } else {
    res.status(401).send({ message: "Invalid Credentials" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
});

router.post("/register",(req,res)=>{
  const newUser = new User(req.body);
  newUser.save()
  .then(()=>{
    res.status(201).send({ message: "User registered successfully" });
  })
  .catch((err)=>{
    const msg = err.errorResponse.errmsg;
    res.status(500).send({ message: "Error registering user ", error: msg });
  })
});

export default router;