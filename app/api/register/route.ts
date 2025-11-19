import { createUser } from '@/lib/auth/authService';
import { ExistingUserError } from '@/lib/auth/erorrs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get email and password from the React form
    const { email, password, firstName } = await request.json();
    let userFirstName = "Default User"; // default name here

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    

    if(firstName == ""){
      userFirstName = firstName;
    }

    const result = await createUser(email, password, userFirstName);


    return NextResponse.json({ message: 'Account created successfully!' });


  } catch (error) {
      if(error instanceof ExistingUserError){
        return new NextResponse("User Already Exists", {status: 401});
      }
      
      console.error("Register Error", error);
      return new NextResponse("Server Internal Error", {status: 500});
  }
}