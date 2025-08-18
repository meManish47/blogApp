import { getUserFromCookies } from "@/helper/helper";
import prismaClient from "@/services/prisma";
import { blog } from "../../../../../generated/prisma";

export async function getBlogbyId(parent:unknown, args: {id:string}) {
  const id = args.id;
  const blog = await prismaClient.blog.findUnique({
    where: { id },
  });
  return blog;
}
export async function getBlogsBySearch(parent:unknown, args: { q: string }) {
  const query = args.q || "";
  const blogs = await prismaClient.blog.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
  });
  return blogs;
}

export async function getblogs() {
  const blogs = await prismaClient.blog.findMany();
  return blogs;
}

export default async function addBlogInDb(
  parent:unknown,
  args: {
    title: string;
    content: string;
    imageUrl: string;
  }
) {
  const user = await getUserFromCookies();
  if (!user) return null;
  const id = user.id;
  try {
    const blog = await prismaClient.blog.create({
      data: { ...args, userId: id },
    });
    if (blog) return blog;
    return null;
  } catch (err) {
    return null;
  }
}
export async function deleteBlog(parent:unknown, args: { id: string }) {
  try {
    await prismaClient.blog.delete({
      where: { id: args.id },
    });
    return true;
  } catch (err) {
    return false;
  }
}
export async function updateBlog(
  parent:unknown,
  args: { id: string; title: string; content: string }
) {
  try {
    const blog = await prismaClient.blog.update({
      where: { id: args.id },
      data: {
        title: args.title,
        content: args.content,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}

export async function getCurrentUserBlogs() {
  const currentUser = await getUserFromCookies();
  if (!currentUser) return null;
  try {
    const blogs = await prismaClient.blog.findMany({
      where: { userId: currentUser.id },
    });
    return blogs;
  } catch (err) {
    return null;
  }
}

export async function getBlogsUser(blog: blog) {
  const userId = blog.userId;
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (err) {
    return null;
  }
}
