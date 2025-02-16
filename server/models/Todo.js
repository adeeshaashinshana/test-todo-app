const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
); // Important!

// Virtual for the user (only populated after find)
todoSchema.virtual("populatedUser", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: true, // For a single user
});

module.exports = mongoose.model("Todo", todoSchema);
