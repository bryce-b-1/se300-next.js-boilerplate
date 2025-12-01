import { getSessionIdentity } from "../auth/getSessionIdentity";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/lib/db-models/UserModel";


const connect =  async () => await dbConnect();

export async function getIdFromIdentity(log = false){
  const identity = await getSessionIdentity();
  if (!identity) return null;  
  
  if (log) { console.log(identity)};

  return identity.userID;
}




export async function getUser(userID : number){
  const user =  await UserModel.findOne({userID: userID });
  return user;
}


export async function getUserFirstName(userID : number){
  const user = await getUser(userID);
  return user?.firstName;
}
export async function getUserEmail(userID : number){
  const user = await getUser(userID);
  return user?.email;
}


// Uses the session token to verify who is logged in and grabs the userID from the database
export async function getCurrentUser() {
  const userID = await getIdFromIdentity();
  if (!userID) return null;

  return await getUser(userID);
}

export async function getCurrentUserID() {
  const userID = await getIdFromIdentity();
  if (!userID) return null;

  return userID;
}



// Uses the session token to verify who is logged in and grabs the firstName from the database
export async function getCurrentUserFirstName() {
  const user = await getCurrentUser();
  return user?.firstName || null;
}





// Uses the session token to verify who is logged in and grabs the email from the database
export async function getCurrentUserEmail() {
  const user = await getCurrentUser();
  return user?.email || null;
}



export async function setUserFirstName(userID : number , newName : string) {
  
  const updatedUser = await UserModel.findOneAndUpdate( {userID : userID}, {firstName : newName}, { new: true } );

  return updatedUser;

}

export async function setCurrentUserFirstName(newName : string) {
  const user = await getCurrentUser();
  
  const updatedUser = setUserFirstName(user.userID, newName);
  return updatedUser;


}

export async function setUserEmail(userID : number , newEmail : string) {
  
  const updatedUser = await UserModel.findOneAndUpdate( {userID : userID}, {email : newEmail}, { new: true } );

  return updatedUser;

}

export async function setCurrentUserEmail(newEmail : string) {
  const user = await getCurrentUser();
  
  const updatedUser = setUserEmail(user.userID, newEmail);
  return updatedUser;


}

