import { getSessionIdentity } from "../auth/getSessionIdentity";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/db-models/UserModel";


// Uses the session token to verify who is logged in and grabs the userId from the database
export async function getCurrentUser() {
  const userId = await getIdFromIdentity();

  await dbConnect();
  return await UserModel.findOne({ userId: userId });
}



// Uses the session token to verify who is logged in and grabs the firstName from the database
export async function getCurrentUserFirstName() {
  const userId = await getIdFromIdentity();

  await dbConnect();
  const user =  await UserModel.findOne({userId: userId })
  // console.log(user);
  return user?.firstName || null;
}


// Uses the session token to verify who is logged in and grabs the email from the database
export async function getCurrentUserEmail() {
  const userId = await getIdFromIdentity();
  await dbConnect();
  const user =  await UserModel.findOne({userId: userId})
//   console.log(user);
  return user?.email || null;
}


export async function getIdFromIdentity(log = false){
  const identity = await getSessionIdentity();
  if (!identity) return null;  
  
  if (log) { console.log(identity)};

  return identity.userId;
}


export async function checkMemberOfGroups(){
  
}


// TODO Make function changeCurrentEmail ref previous func
