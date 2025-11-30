import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import GroupModel from "@/lib/db-models/GroupModel";

async function run() {
  try {
    await dbConnect();
    console.log("Connected!");

    const result = await GroupModel.deleteMany({});
    console.log("Deleted groups:", result.deletedCount);

    await mongoose.disconnect();
    console.log("Disconnected");
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
