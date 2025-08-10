import { gqlClient } from "@/actions/gqlaction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { gql } from "graphql-request";
import Link from "next/link";
import SearchBar from "@/components/searchComp/searchbar";
const GET_BLOGS = gql`
  query Query {
    blogs {
      id
      title
      content
    }
  }
`;
type Blog = {
  id: String;
  title: String;
  content: String;
  createdAt: String;
};
export default async function Page() {
  const data: { blogs: Blog[] } = await gqlClient.request(GET_BLOGS);
  const blogs = data.blogs;
  console.log(blogs);
  return (
    <main className="h-screen w-screen flex flex-col gap-4 justify-start items-center pt-10">
      <SearchBar/>
      {blogs.map((blog) => {
        return (
          <Card className="w-100" key={"#"}>
            <CardHeader>{blog.title}</CardHeader>
            <CardDescription className="px-6">{blog.content}</CardDescription>
            <CardFooter>
              <Link href={`/blogs/${blog.id}`}>
                <Button variant={"link"}>View</Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </main>
  );
}
