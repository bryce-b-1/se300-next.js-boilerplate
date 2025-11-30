// lib/db-models/GroupModel.ts
import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  userID: {
    type: Number,              
    required: true,
  },
  role: {
    type: String,
    enum: ["leader", "member"],
    default: "member",
  },
}, { versionKey: false });

const GroupSchema = new mongoose.Schema({
  groupID: {
    type: Number,
    required: true,
    unique: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  groupDescription: {
    type: String,
  },
  members: {
    type: [MemberSchema],      
    default: [],
  },
}, { versionKey: false });

export default mongoose.models.Group || mongoose.model('Group', GroupSchema, 'Groups');