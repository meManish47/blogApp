import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import typeDefs from "./typeDefs";
import addBlogInDb, {
  blog,
  deleteBlog,
  getBlogbyId,
  getblogs,
  getBlogsBySearch,
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
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});
export { handler as GET, handler as POST };
