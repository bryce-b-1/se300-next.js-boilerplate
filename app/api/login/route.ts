/**
 * Router that handles user login requests.
 */

import User from '@/lib/models/User'; // <-- The only logic import we need!
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    //Get email and password from the React form
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    //Calls the Login method from User class
    const loginSuccess = await User.login(email, password);

    //Return a response based on success or failure
    if (loginSuccess) {
      return NextResponse.json({ message: 'Login successful!' });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
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
