"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { blog } from "../../../generated/prisma";
import { gql } from "graphql-request";
import { gqlClient } from "@/actions/gqlaction";
const UPDATE_BLOG = gql`
  mutation Mutation($updateBlogId: String!, $title: String, $content: String) {
    updateBlog(id: $updateBlogId, title: $title, content: $content)
  }
`;
export default function UpdateBlog({
  blog,
}: {
  blog: {
    id: String;
    title: String;
    content: String;
  };
}) {
  const [title, setTitle] = useState<String>(blog.title);
  const [content, setContent] = useState<String>(blog.content);
  const [open, setOpen] = useState(false);
  async function handleSubmit() {
    if (!title || !content) {
      alert("Title and content should not be empty");
      return;
    }
    const data: { updateBlog: boolean } = await gqlClient.request(UPDATE_BLOG, {
      updateBlogId: blog.id,
      title,
      content,
    });
    const res = data.updateBlog;
    if (res) {
      alert("Updated");
      setOpen(false);
      window.location.reload();
    } else alert("Failed");
  }
  return (
    <div className="mx-4">
      <Dialog modal={false} open={open} onOpenChange={setOpen}>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit blog</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue=""
                  placeholder="Title"
                  value={title as string}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label>Content</Label>
                <Textarea
                  placeholder="Content.."
                  value={content as string}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
