// app/api/profile/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/db-models/UserModel"; // adjust path/name to your actual User model
import { getCurrentUserID } from "@/lib/ts-models/User"; // you already have something like this

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { firstName, email } = await req.json();
    const userID = await getCurrentUserID();

    if (!userID) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Update the current user's profile
    await User.updateOne(
      { userID },                // find by your userID field
      {
        $set: {
          firstName,
          email,
        },
      }
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
