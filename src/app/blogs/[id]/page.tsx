import { gqlClient } from "@/actions/gqlaction";
import { BlogWithUser } from "@/app/showBlogs/page";
import BlogCard from "@/components/blogComp/blogcard";
import { gql } from "graphql-request";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const GET_BLOG = gql`
    query Blog($id: String) {
      blog(id: $id) {
        title
        content
        imageUrl
        id
        userId
        user {
          email
          id
          name
        }
      }
    }
  `;
  const data: { blog: BlogWithUser } = await gqlClient.request(GET_BLOG, {
    id,
  });
  const blog = data.blog;
  return (
    <main className="flex justify-center flex-col gap-6 items-center w-screen h-screen">
      <BlogCard blog={blog} />
    </main>
  );
}
