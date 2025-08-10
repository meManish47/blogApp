import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type jwtDecode = {
  id: string;
};

export async function getUserFromCookies() {
  const userCookies = await cookies();
  const token: string | undefined = userCookies.get("token")?.value;
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as string;
    const user = await prismaClient.user.findUnique({
      where: {
        id: decoded,
      },
    });
    if (!user) return null;
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
export async function deleteCookies() {
  const userCookies = await cookies();
  userCookies.delete("token");
  return true;
}
