import User from '@/lib/models/User'; // <-- Only import the User class
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get email and password from the React form
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Calls the Register method from User class
    const result = await User.register(email, password);

    // Return a response based on success or failure
    if (result.success) {
      return NextResponse.json({ message: 'Account created successfully!' });
    } else {
      return NextResponse.json(
        { error: result.error || 'Account creation failed.' },
        { status: result.error === 'User already exists' ? 409 : 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Server error occurred' },
      { status: 500 }
    );
  }
}