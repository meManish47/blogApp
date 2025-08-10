import { createToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
export async function createUserInDb(
  x: any,
  args: { email: String; password: String }
) {
  try {
    const user = await prismaClient.user.create({
      data: { email: args.email as string, password: args.password as string },
    });
    if (user) return true;
    return false;
  } catch (err) {
    return false;
  }
}
export async function LoginUser(
  x: any,
  args: { email: String; password: String }
) {
  const userCookies = await cookies();
  try {
    const user = await prismaClient.user.findUnique({
      where: { email: args.email as string },
    });
    console.log("-__-_----_--_-", user?.password === args.password);
    if (user?.password === args.password) {
      const token = createToken({ id: user.id });
      console.log("token", token);
      userCookies.set("token", token);

      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

