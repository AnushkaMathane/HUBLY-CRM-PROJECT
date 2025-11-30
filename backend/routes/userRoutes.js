import express from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../mongo-context.js";

const router = express.Router();

// ✅ GET USER BY ID
router.get("/api/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await getDB()
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
