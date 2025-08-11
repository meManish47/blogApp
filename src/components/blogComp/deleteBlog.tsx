"use client";
import { gql } from "graphql-request";
import { Button } from "../ui/button";
import { gqlClient } from "@/actions/gqlaction";
import { MdDelete } from "react-icons/md";

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
    <div>
      <Button
        variant={"link"}
        className="block sm:hidden text-red-500 px-1 cursor-pointer  "
        onClick={handleClick}
      >
        <MdDelete size={22} />
      </Button>
      <Button
        variant={"destructive"}
        className="hidden sm:flex w-16 px-1 cursor-pointer h-8 justify-center items-center "
        onClick={handleClick}
      >
        Delete
      </Button>
    </div>
  );
}
