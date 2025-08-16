"use client";
import { gqlClient } from "@/actions/gqlaction";
import { gql } from "graphql-request";
import SearchBar from "@/components/searchComp/searchbar";
import { useContext, useEffect, useState } from "react";
import BlogCard from "@/components/blogComp/blogcard";
import { UserContext } from "@/components/NewUserContext";
import { BlogWithUser } from "../showBlogs/page";
const GET_CURRENT_USER_BLOGS = gql`
  query Query {
    currentUserBlogs {
      id
      title
      content
      imageUrl
      userId
      user {
        name
      }
    }
  }
`;

export default function Page() {
  const [blogs, setBlogs] = useState<BlogWithUser[]>([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);
  const user = context?.user;
  useEffect(() => {
    async function getCurrentUserBlogs() {
      setLoading(true);
      const data: { currentUserBlogs: BlogWithUser[] } =
        await gqlClient.request(GET_CURRENT_USER_BLOGS);
      const blogs = data.currentUserBlogs;

      setBlogs(blogs);
      setLoading(false);
    }
    getCurrentUserBlogs();
  }, []);
  if (loading) {
    return (
      <main className=" w-screen flex  gap-4 justify-start items-center pt-10">
        <SearchBar />
        <div className="h-full w-full flex gap-6 px-4 sm:px-40 flex-wrap">
          {[0, 0, 0].map((item) => {
            return (
              <div className="flex w-100 flex-col gap-8">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            );
          })}
        </div>
      </main>
    );
  }
  if (!blogs)
    return (
      <div>
        <h1>No blogs</h1>
      </div>
    );
  return (
    <main className="h-screen w-screen flex flex-col gap-4 justify-start items-center pt-10 px-4 sm:px-40">
      <SearchBar />
      <div className="flex px-8 gap-6  h-full w-full flex-wrap">
        {blogs.map((blog) => {
          return (
            <div key={blog.id as string}>
              <BlogCard blog={blog} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
