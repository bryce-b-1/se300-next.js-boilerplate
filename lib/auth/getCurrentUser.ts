import { getSessionIdentity } from "./getSessionIdentity";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/db-models/UserModel";


// Uses the session token to verify who is logged in and grabs the userId from the database
export async function getCurrentUserId() {
  const identity = await getSessionIdentity();
  if (!identity) return null;

  await dbConnect();
  return await UserModel.findOne({ userId: identity.userId });
}



// Uses the session token to verify who is logged in and grabs the firstName from the database
export async function getCurrentUserFirstName() {
  const identity = await getSessionIdentity();
  if (!identity) return null;  

  console.log(identity);

  await dbConnect();
  const user =  await UserModel.findOne({userId: identity.userId })
  console.log(user);
  return user?.firstName || null;
}


// Uses the session token to verify who is logged in and grabs the email from the database
export async function getCurrentUserEmail() {
  const identity = await getSessionIdentity();
  if (!identity) return null;  

  await dbConnect();
  const user =  await UserModel.findOne({userId: identity.userId})
//   console.log(user);
  return user?.email || null;
}



// TODO Make function changeCurrentEmail ref previous func
