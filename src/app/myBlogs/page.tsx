"use client";
import { gqlClient } from "@/actions/gqlaction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { gql } from "graphql-request";
import Link from "next/link";
import SearchBar from "@/components/searchComp/searchbar";
import DeleteBlogComponent from "@/components/blogComp/deleteBlog";
import UpdateBlog from "@/components/blogComp/updateBlog";
import { useEffect, useState } from "react";
const GET_CURRENT_USER_BLOGS = gql`
  query Query {
    currentUserBlogs {
      id
      title
      content
    }
  }
`;
type Blog = {
  id: String;
  title: String;
  content: String;
  createdAt: String;
};
export default function Page() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    async function getCurrentUserBlogs() {
      const data: { currentUserBlogs: Blog[] } = await gqlClient.request(
        GET_CURRENT_USER_BLOGS
      );
      console.log("data", data);
      const blogs = data.currentUserBlogs;
      console.log(".....", blogs);
      setBlogs(blogs);
    }
    getCurrentUserBlogs();
    console.log("--_----_--", blogs);
  }, []);

  return (
    <main className="h-screen w-screen flex flex-col gap-4 justify-start items-center pt-10">
      <SearchBar />
      {blogs.map((blog) => {
        return (
          <Card className="w-100" key={"#"}>
            <CardHeader>{blog.title}</CardHeader>
            <CardDescription className="px-6">{blog.content}</CardDescription>
            <CardFooter>
              <Link href={`/blogs/${blog.id}`}>
                <Button variant={"link"}>View</Button>
              </Link>
              <UpdateBlog blog={blog} />
              <DeleteBlogComponent id={blog.id} />
            </CardFooter>
          </Card>
        );
      })}
    </main>
  );
}
