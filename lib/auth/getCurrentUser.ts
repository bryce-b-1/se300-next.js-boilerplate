import { getSessionIdentity } from "./getSessionIdentity";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/db-models/UserModel";

export async function getCurrentUserID() {
  const identity = await getSessionIdentity();
  if (!identity) return null;

  await dbConnect();
  return await UserModel.findOne({ userId: identity.userId }).lean();
}


export async function getCurrentUserFirstName() {
  const identity = await getSessionIdentity();
  if (!identity) return null;  

  await dbConnect();
  const user =  await UserModel.findOne({userID: identity.userId })
//   console.log(user);
  return user?.firstName || null;
}

export async function getCurrentUserEmail() {
  const identity = await getSessionIdentity();
  if (!identity) return null;  

  await dbConnect();
  const user =  await UserModel.findOne({userID: identity.userId})
//   console.log(user);
  return user?.email || null;
}
