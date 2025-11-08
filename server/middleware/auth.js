import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = { id: user._id };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
