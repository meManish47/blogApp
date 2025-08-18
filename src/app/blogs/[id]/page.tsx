import { gqlClient } from "@/actions/gqlaction";
import { gql } from "graphql-request";
import { blog } from "../../../../generated/prisma";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import UpdateBlog from "@/components/blogComp/updateBlog";
import DeleteBlogComponent from "@/components/blogComp/deleteBlog";
import BlogCard from "@/components/blogComp/blogcard";
import { BlogWithUser } from "@/app/showBlogs/page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const GET_BLOG = gql`
    query Blog($id: String) {
      blog(id: $id) {
        title
        content
        imageUrl
        id
        userId
        user {
          email
          id
          name
        }
      }
    }
  `;
  const data: { blog: BlogWithUser } = await gqlClient.request(GET_BLOG, {
    id,
  });
  const blog = data.blog;
  //   console.log(blog);
  return (
    <main className="flex justify-center flex-col gap-6 items-center w-screen h-screen">
      <BlogCard blog={blog} />
    </main>
  );
}
