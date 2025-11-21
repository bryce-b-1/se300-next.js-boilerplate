/**
 * Router that handles user login requests.
 */

import { authenticateUser } from '@/lib/auth/authService';
import { InvalidCredentialsError } from '@/lib/auth/erorrs';
import { createSessionToken } from '@/lib/auth/token';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log("Recieved POST request, starting program")
  try {

    const { email, password } = await request.json();
    console.log('set email and password variables');


    const dbUser = await authenticateUser(email, password);
    console.log('dbUser created');

    const token = await createSessionToken({
      userId: dbUser.userId,
      email: dbUser.email
    });

    console.log('SessionToken initalized');

    (await cookies()).set("session", token, {
      httpOnly: true,
      path: "/",
    });

    console.log('session cookie created');


    return NextResponse.json({ message: 'Login successful!' });

  } catch (error) {
    if(error instanceof InvalidCredentialsError){
      return new NextResponse("Invalid credentials", {status: 401});
    }

    console.error("Login Error", error);
    return new NextResponse("Server Internal Error", {status: 500});
  }
  


}  
