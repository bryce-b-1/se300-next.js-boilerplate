import { createUser } from '@/lib/auth/authService';
import { ExistingUserError } from '@/lib/auth/erorrs';
import dbConnect from '@/lib/dbConnect';
import { getGroupById, getUserRoleInGroup, getUsersGroups, addMemberToGroup } from '@/lib/ts-models/Group';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { type, groupId } = await request.json();
    
    await dbConnect();

    // const result = await getGroupById(Number(groupId));
    const result = await getUsersGroups(1);
    // const result = await getUserRoleInGroup(1,1);
    // const result = await addMemberToGroup(1, 2, "member");  

    console.log(result);


    return NextResponse.json({ message: 'No error detected. API result returned.', result });


  } catch (error) {
      if(error instanceof ExistingUserError){
        return new NextResponse("User Already Exists", {status: 401});
      }
      
      console.error("Register Error", error);
      return new NextResponse("Server Internal Error", {status: 500});
  }
}