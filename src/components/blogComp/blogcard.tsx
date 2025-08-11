"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import UpdateBlog from "./updateBlog";
import DeleteBlogComponent from "./deleteBlog";
import { useContext } from "react";
import { UserContext } from "../NewUserContext";
import { BlogWithUser } from "@/app/showBlogs/page";
import { GradientText } from "../animate-ui/text/gradient";
export default function BlogCard({ blog }: { blog: BlogWithUser }) {
  const context = useContext(UserContext);
  const user = context?.user;

  return (
    <div className="card bg-[#171719] w-96 shadow-sm h-110">
      <figure className="h-[40%] sm:h-1/2 ">
        <img src={blog.imageUrl} alt="Shoes" className=" object-cover" />
      </figure>
      <div className="card-body h-[60%] sm:h-1/2 ">
        <h1 className="card-title text-xl font-bold h-max">{blog.title}</h1>
        <p className="line-clamp-3 h-max">{blog.content}</p>

        <p className="flex flex-col justify-end items-end">
          <GradientText
            className="font-bold tracking-widest"
            gradient="linear-gradient(90deg, #f97316 0%, #f43f5e 20%, #8b5cf6 50%, #f43f5e 80%, #f97316 100%)
"
            text={`-`+blog.user.name}
          />
        </p>

        <div className="card-actions flex  justify-between h-[20%]">
          <Link href={`/blogs/${blog.id}`}>
            <Button variant={"link"} className="cursor-pointer w-max px-0">
              View
            </Button>
          </Link>
          {user?.id === blog.userId && (
            <div className="flex items-center justify-center  ">
              {" "}
              <UpdateBlog blog={blog} />
              <DeleteBlogComponent id={blog.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
