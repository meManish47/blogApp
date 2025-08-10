import { gqlClient } from "@/actions/gqlaction";
import { gql } from "graphql-request";
import { blog } from "../../../generated/prisma";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteBlogComponent from "@/components/blogComp/deleteBlog";
import UpdateBlog from "@/components/blogComp/updateBlog";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const GET_BLOGS_SEARCH = gql`
    query Query($q: String) {
      blogsBySearch(q: $q) {
        id
        title
        content
        createdAt
      }
    }
  `;
  const data: { blogsBySearch: blog[] } = await gqlClient.request(
    GET_BLOGS_SEARCH,
    { q }
  );
  const blogs = data.blogsBySearch;
  if (!blogs.length)
    return (
      <main className="h-screen w-screen flex flex-col justify-start p-10 items-center">
        <h1>No blogs found for search query "{q}"</h1>
      </main>
    );
  return (
    <main className="h-screen w-screen flex flex-col gap-6 justify-start p-10 items-center">
      {blogs.map((blog) => {
        return (
          <Card className="w-100" key={"#"}>
            <CardHeader>{blog.title}</CardHeader>
            <CardDescription className="px-6">{blog.content}</CardDescription>
            <CardFooter>
              <UpdateBlog blog={blog} />
              <DeleteBlogComponent id={blog.id} />
              <Link href={`/blogs/${blog.id}`}>
                <Button variant={"link"}>View</Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
      <Link href={"/"} className="hover:underline">
        Home
      </Link>
    </main>
  );
}
