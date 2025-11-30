import { cookies } from "next/headers";
import { verifySessionToken } from "./token";


// Grabs the token/session and verifies it exists, then returns userID and email as an object
export async function getSessionIdentity() {
  
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  const payload = await verifySessionToken(token);
  if (!payload) return null;

  console.log(payload);

  return {
    userID: payload.userID,
    email: payload.email
  };
}

export async function removeSessionIdentity(){

}

