"use client";
import addDataInDb from "@/actions/actions";
import { gqlClient } from "@/actions/gqlaction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { gql } from "graphql-request";
import Link from "next/link";
import { useState } from "react";
const CREATE_BLOG = gql`
  mutation Mutation($title: String!, $content: String!) {
    createBlog(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;
export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  async function handleSubmit() {
    try {
      const data: {
        createBlog: { id: string; title: string; content: string };
      } = await gqlClient.request(CREATE_BLOG, { title, content });
      console.log(data);
      const blog = data.createBlog;
      if (blog) alert("Success");
      else alert("Error");
      setTitle("");
      setContent("");
    } catch (err) {
      alert((err as Error).message);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-6 justify-center items-center">
      <Card className="w-120">
        <CardHeader>
          <CardTitle>Add your Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  type="title"
                  placeholder="Enter title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Content</Label>
                </div>
                <Textarea
                  placeholder="Enter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
      <Link href={"/showBlogs"} className="hover:underline underline-offset-6">
        Show all Blogs
      </Link>
    </div>
  );
}
