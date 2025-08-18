import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./typeDefs";
import addBlogInDb, {
  deleteBlog,
  getBlogbyId,
  getblogs,
  getBlogsBySearch,
  getBlogsUser,
  getCurrentUserBlogs,
  updateBlog,
} from "./resolvers/blog";
import { createUserInDb, LoginUser } from "./resolvers/user";
import { deleteCookies, getUserFromCookies } from "@/helper/helper";

const resolvers = {
  Query: {
    blog: getBlogbyId,
    blogs: getblogs,
    blogsBySearch: getBlogsBySearch,
    currentUser: getUserFromCookies,
    currentUserBlogs: getCurrentUserBlogs,
  },
  Mutation: {
    createBlog: addBlogInDb,
    deleteBlog: deleteBlog,
    updateBlog: updateBlog,
    createUser: createUserInDb,
    loginUser: LoginUser,
    logoutUser: deleteCookies,
  },
  Blog: {
    user: getBlogsUser,
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});
export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}
