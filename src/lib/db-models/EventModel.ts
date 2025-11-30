// lib/db-models/EventModel.ts
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    eventID: {
      type: Number,
      required: [true, "Please provide an eventID"],
      unique: true,
    },
    groupID: {
      type: Number,
      required: [true, "Please provide a groupID for this event"],
    },
    title: {
      type: String,
      required: [true, "Please provide a title for this event"],
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    startTime: {
      type: Date,
      required: [true, "Please provide a start time"],
    },
    endTime: {
      type: Date,
    },
    hostUserID: {
      type: Number,
    },
  },
  {
    timestamps: true, 
  }
);


export default mongoose.models.Event ||
  mongoose.model("Event", EventSchema, "Events");
