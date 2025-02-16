const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/auth"); // Create this middleware

// Get todos for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }); // Filter by user ID
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new todo (for the authenticated user)
router.post("/", authMiddleware, async (req, res) => {
  console.log("req.body >>", req.body);

  const todo = new Todo({ ...req.body, user: req.user.id });
  try {
    const newTodo = await todo.save();
    const populatedTodo = await Todo.findById(newTodo._id).populate(
      "populatedUser"
    );
    res.status(201).json(populatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ... (Update and Delete routes - also use authMiddleware and filter by user)

// Update a todo (for the authenticated user)
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Ensure user match
      req.body,
      { new: true }
    );
    if (!updatedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not authorized" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a todo (for the authenticated user)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not authorized" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
