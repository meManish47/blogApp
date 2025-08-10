"use client";
import { gql } from "graphql-request";
import { Button } from "../ui/button";
import { gqlClient } from "@/actions/gqlaction";
const DELETE_BLOG = gql`
  mutation Mutation($deleteBlogId: String!) {
    deleteBlog(id: $deleteBlogId)
  }
`;
export default function DeleteBlogComponent({ id }: { id: String }) {
  async function handleClick() {
    const data: { deleteBlog: boolean } = await gqlClient.request(DELETE_BLOG, {
      deleteBlogId: id,
    });
    if (data.deleteBlog) alert("Success");
    else alert("Failed");
  }
  return (
    <Button
      variant={"destructive"}
      className="w-max px-1 cursor-pointer"
      onClick={handleClick}
    >
      Delete
    </Button>
  );
}
