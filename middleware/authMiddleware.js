import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send({ message: "Unauthorized" });
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('***In middleware', decoded);
            const user = await User.findById(decoded.userId);
            if (!user) return res.status(401).json({ error: 'User not found' });

            req.user = user;
            next();
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
}

export default authMiddleware;