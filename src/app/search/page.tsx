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
import BlogCard from "@/components/blogComp/blogcard";
import { BlogWithUser } from "../showBlogs/page";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const GET_BLOGS_SEARCH = gql`
    query BlogsBySearch($q: String) {
      blogsBySearch(q: $q) {
        createdAt
        content
        id
        imageUrl
        title
        user {
          email
          id
          name
        }
        userId
      }
    }
  `;
  const data: { blogsBySearch: BlogWithUser[] } = await gqlClient.request(
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
        return <BlogCard blog={blog} />;
      })}
    </main>
  );
}
