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
import BlogCard from "@/components/blogComp/blogcard";
import { blog } from "../../../generated/prisma";
const GET_BLOGS = gql`
  query Query {
    blogs {
      id
      title
      content
    }
  }
`;

export default async function Page() {
  const data: { blogs: blog[] } = await gqlClient.request(GET_BLOGS);
  const blogs = data.blogs;
  return (
    <main className="h-screen flex flex-col gap-4 justify-start items-center  pt-10">
      <SearchBar />
      <div className="h-full w-[80%]  flex flex-wrap px-4 py-4 gap-4">
        {blogs.map((blog) => {
          return <BlogCard blog={blog} />;
        })}
      </div>
    </main>
  );
}
