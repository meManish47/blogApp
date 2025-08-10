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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const GET_BLOG = gql`
    query Query($id: String) {
      blog(id: $id) {
        id
        title
        content
      }
    }
  `;
  const data: { blog: blog } = await gqlClient.request(GET_BLOG, { id });
  const blog = data.blog;
  //   console.log(blog);
  return (
    <main className="flex justify-center flex-col gap-6 items-center w-screen h-screen">
      <Card className="w-100">
        <CardHeader>{blog.title}</CardHeader>
        <CardDescription className="px-6 text-base">
          {blog.content}
        </CardDescription>
        <div className="flex gap-2">
          <UpdateBlog blog={blog} />
          <DeleteBlogComponent id={blog.id} />
        </div>
      </Card>
      <Link href="/" className="hover:underline">
        Home
      </Link>
    </main>
  );
}
