// lib/db-models/AnnouncementModel.ts
import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    announcementID: {
      type: Number,
      required: [true, "Please provide an announcementID"],
      unique: true,
    },
    groupID: {
      type: Number,
      required: [true, "Please provide a groupID for this announcement"],
    },
    title: {
      type: String,
      required: [true, "Please provide a title for this announcement"],
    },
    body: {
      type: String,
      required: [true, "Please provide body text for this announcement"],
    },
    authorUserID: {
      type: Number,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema, "Announcements");
