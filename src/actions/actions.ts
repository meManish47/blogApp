"use server";
import prismaClient from "@/services/prisma";

export default async function addDataInDb(data: {
  title: string;
  content: string;
}) {
  try {
    const blog = await prismaClient.blog.create({
      data,
    });
    if (blog) return { success: true, blog };
    return { success: false, message: "NOT CREATED" };
  } catch (err) {
    return { success: false, message: (err as Error).message };
  }
}
