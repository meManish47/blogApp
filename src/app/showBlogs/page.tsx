import { gqlClient } from "@/actions/gqlaction";
import { gql } from "graphql-request";
import SearchBar from "@/components/searchComp/searchbar";
import BlogCard from "@/components/blogComp/blogcard";
import { blog, user } from "../../../generated/prisma";
const GET_BLOGS = gql`
  query Query {
    blogs {
      id
      title
      content
      userId
      imageUrl
      user {
        id
        name
        email
      }
    }
  }
`;
export type BlogWithUser = blog & {
  user: user;
};
export default async function Page() {
  const data: { blogs: BlogWithUser[] } = await gqlClient.request(GET_BLOGS);
  const blogs = data.blogs;
  return (
    <main className="h-full flex flex-col gap-4 justify-start items-center  pt-10">
      <SearchBar />
      <div className="h-full w-[80%]  flex flex-wrap px-4 py-4 gap-4">
        {blogs.map((blog) => {
          return <BlogCard blog={blog} />;
        })}
      </div>
    </main>
  );
}
