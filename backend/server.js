import express from "express";
import cors from "cors";
import { connectDB } from "./mongo-context.js";
import {
  getAllUser,
  createUser,
  loginUser,
  deleteUser,
  updateUser,
} from "./useroperation.js";
import { getAllTickets } from "./ticketoperations.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
connectDB();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
  })
);

app.get("/api/user", async (req, res) => {
  const users = await getAllUser();
  res.json(users);
});

app.post("/api/user", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/user/delete", async (req, res) => {
  try {
    const idToDelete = req.body.id;
    const deleted = await deleteUser(idToDelete);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

import userRoutes from "./routes/userRoutes.js";
app.use(userRoutes);

app.put("/api/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = { ...req.body, id };

    const updated = await updateUser(updatedUser);

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/tickets", async (req, res) => {
  const tickets = await getAllTickets();
  res.status(200).json({ message: "All tickets", tickets });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(err));
