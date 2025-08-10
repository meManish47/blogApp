import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import addBlogInDb, {
  blog,
  getBlogbyId,
  getblogs,
  getBlogsBySearch,
} from "./resolvers/blog";
const typeDefs = gql`
  scalar x
  type Query {
    blog(id: String): Blog
    blogs: [Blog]
    blogsBySearch(q: String): [Blog]
  }
  type Mutation {
    createBlog(title: String!, content: String!): Blog
  }
  type Blog {
    id: String
    title: String
    content: String
    createdAt: String
  }
`;

const resolvers = {
  Query: {
    blog: getBlogbyId,
    blogs: getblogs,
    blogsBySearch: getBlogsBySearch,
  },
  Mutation: {
    createBlog: addBlogInDb,
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
