// app/api/profile/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/dbConnect";
import User from "@/src/lib/db-models/UserModel"; 
import { getCurrentUserID } from "@/src/lib/ts-models/User"; 

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
      { userID },                
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
