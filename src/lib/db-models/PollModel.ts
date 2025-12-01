// lib/db-models/PollModel.ts
import mongoose from "mongoose";

const PollOptionSchema = new mongoose.Schema(
  {
    optionID: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: [true, "Please provide option text"],
    },
    votes: {
      type: Number,
      default: 0, 
    },
  },
  { _id: false }
);

const PollSchema = new mongoose.Schema(
  {
    pollID: {
      type: Number,
      required: [true, "Please provide a pollID"],
      unique: true,
    },
    groupID: {
      type: Number,
      required: [true, "Please provide a groupID for this poll"],
    },
    question: {
      type: String,
      required: [true, "Please provide a question for this poll"],
    },
    options: {
      type: [PollOptionSchema],
      required: true,
      validate: {
        validator: function (v: unknown[]) {
          return Array.isArray(v) && v.length >= 2;
        },
        message: "A poll must have at least two options.",
      },
    },
    createdByUserID: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Poll ||
  mongoose.model("Poll", PollSchema, "Polls");
