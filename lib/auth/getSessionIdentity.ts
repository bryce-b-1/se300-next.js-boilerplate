import { cookies } from "next/headers";
import { verifySessionToken } from "./token";

export async function getSessionIdentity() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  const payload = await verifySessionToken(token);
  if (!payload) return null;

  console.log(payload);

  return {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  };
}

