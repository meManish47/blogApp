"use client";
import { gqlClient } from "@/actions/gqlaction";
import { UserContext } from "@/components/NewUserContext";
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
import { useContext, useState } from "react";
import { toast } from "sonner";
const CREATE_BLOG = gql`
  mutation Mutation($title: String!, $content: String!, $userId: String!) {
    createBlog(
      title: $title
      content: $content
      userId: $userId
      imageUrl: $imageUrl
    ) {
      id
      title
      content
      userId
      imageUrl
    }
  }
`;
export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageURl] = useState<string>("");
  const context = useContext(UserContext);
  const user = context?.user;
  async function handleSubmit() {
    try {
      const data: {
        createBlog: { id: string; title: string; content: string };
      } = await gqlClient.request(CREATE_BLOG, {
        title,
        content,
        userId: user?.id,
        imageUrl,
      });
      console.log(data);
      const blog = data.createBlog;
      if (blog) toast.success("Created");
      else toast.error("Error");
      setTitle("");
      setContent("");
    } catch (err) {
      alert((err as Error).message);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-6 justify-center items-center">
      <Card className="w-80 sm:w-120 rounded-sm">
        <CardHeader>
          <CardTitle className="text-base sm:text-xl">Add your Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Enter title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xs"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Content</Label>
                </div>
                <Textarea
                  placeholder="Enter content"
                  value={content}
                  className="rounded-xs"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>ImageUrl</Label>
                <Input
                  type="text"
                  placeholder="Enter image url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageURl(e.target.value)}
                  className="rounded-xs"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full rounded-xs cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
