import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { protect } from "../models/authMiddleware.js";

const router = express.Router();

// 🔹 Registro
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email ya registrado" });

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Email o contraseña incorrectos" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Obtener perfil
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

export default router;
