import Link from "next/link";
import { blog } from "../../../generated/prisma";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import UpdateBlog from "./updateBlog";
import DeleteBlogComponent from "./deleteBlog";
export default function BlogCard({ blog }: { blog: blog }) {
  return (
    <Card className="h-80 w-70 flex flex-col justify-between" key={blog.id}>
      <CardHeader>{blog.title}</CardHeader>
      <CardDescription className="px-6 line-clamp-4">
        {blog.content}
      </CardDescription>
      <CardFooter>
        <Link href={`/blogs/${blog.id}`}>
          <Button variant={"link"}>View</Button>
        </Link>
        <UpdateBlog blog={blog} />
        <DeleteBlogComponent id={blog.id} />
      </CardFooter>
    </Card>
  );
}
