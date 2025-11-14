import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/db-models/UserModel';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Generate a userID (simple auto-increment based on count)
    const userCount = await UserModel.countDocuments();
    const newUser = new UserModel({
      userID: userCount + 1,
      email,
      passwordHash: password, // store raw password directly
    });

    await newUser.save();

    return NextResponse.json({ message: 'Account created successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Server error occurred' },
      { status: 500 }
    );
  }
}