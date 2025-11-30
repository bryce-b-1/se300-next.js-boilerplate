import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // or "bcrypt" if that's what you're using
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/db-models/UserModel"; // adjust to your actual user model path/name
import { getCurrentUserID } from "@/lib/ts-models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Missing password fields" },
        { status: 400 }
      );
    }

    const userID = await getCurrentUserID();
    if (!userID) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ userID });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // DO NOT log passwords here

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    user.passwordHash = newHash;
    await user.save();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
