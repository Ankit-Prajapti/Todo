import express from "express";
import Todo from "../models/TaskModule.js";

const router = express.Router();

// Get Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
});

// Post Task
router.post("/", async (req, res) => {
  try {
    const task = await Todo.create(req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
});

// Update Task
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
});

// Delete Task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Deleted", success: true });
  } catch (error) {
    res.status(400).json({ message: "Error deleting task", error });
  }
});

export default router;
