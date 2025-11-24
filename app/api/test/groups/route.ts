import { createUser } from '@/lib/auth/authService';
import { ExistingUserError } from '@/lib/auth/erorrs';
import { getGroupById, getUserRoleInGroup, getUsersGroups } from '@/lib/ts-models/Group';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { type, groupId } = await request.json();
    


    // const result = await getGroupById(Number(groupId));
    // const result = await getUsersGroups(0);
    const result = await getUserRoleInGroup(0,0);
    console.log(result);


    return NextResponse.json({ message: 'Account created successfully!', result });


  } catch (error) {
      if(error instanceof ExistingUserError){
        return new NextResponse("User Already Exists", {status: 401});
      }
      
      console.error("Register Error", error);
      return new NextResponse("Server Internal Error", {status: 500});
  }
}