import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/db-models/UserModel';
import { NextResponse } from 'next/server';

// Request hander for user registration
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validates user's inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Checks if the email already exists for a user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Generates a userID
    const userCount = await UserModel.countDocuments();
    const newUser = new UserModel({
      userID: userCount + 1,                  // userID is incremented based on previous user's ID
      email,
      passwordHash: password,        // Stores the raw password directly to MongoDB
    });

    await newUser.save();

    return NextResponse.json({ message: 'Account created successfully!' });
  } catch (error) {           // Catches generic errors that aren't already handled
    console.error(error);
    return NextResponse.json(
      { error: 'Server error occurred' },
      { status: 500 }
    );
  }
}