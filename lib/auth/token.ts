import {SignJWT, jwtVerify} from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");



// Creates the JWT session token with userID and email.
export async function createSessionToken(payload: {userID: number; email: string}) { 
    const token = await new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

    return token;
}


// Returns the userID email and email as a object
export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    // console.log(payload);
    return payload as { userID: number; email: string};
  } catch {
    // console.log("null detected");
    return null;
  }
}



