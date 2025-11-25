import express from "express";
import Assessment from "../models/Assessment.js";
import { protect } from "../models/authMiddleware.js";

const router = express.Router();

// Guardar resultado de evaluación
router.post("/", protect, async (req, res) => {
  const { score } = req.body;
  try {
    const assessment = await Assessment.create({
      user: req.user._id,
      score,
    });
    res.status(201).json(assessment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener historial de evaluaciones de un usuario
router.get("/", protect, async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user._id }).sort({ date: -1 });
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
