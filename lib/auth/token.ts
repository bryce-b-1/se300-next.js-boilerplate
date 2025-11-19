import {SignJWT, jwtVerify} from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret");



export async function createSessionToken(payload: {userId: Number; email: string; role: string}) {
    const token = await new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

    return token;
}


export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    // console.log(payload);
    return payload as { userId: number; email: string; role: string };
  } catch {
    // console.log("null detected");
    return null;
  }
}



