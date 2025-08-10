import gql from "graphql-tag";

export const typeDefs = gql`
  scalar x
  type Query {
    blog(id: String): Blog
    blogs: [Blog]
    blogsBySearch(q: String): [Blog]
    currentUser: User
    currentUserBlogs: [Blog]
  }
  type Mutation {
    createBlog(title: String!, content: String!, userId: String!): Blog
    deleteBlog(id: String!): Boolean
    updateBlog(id: String!, title: String, content: String): Boolean
    createUser(email: String!, password: String!, name: String): Boolean
    loginUser(email: String!, password: String!): Boolean
    logoutUser: Boolean
  }
  type Blog {
    id: String
    title: String
    content: String
    createdAt: String
    userId: String
  }
  type User {
    id: String
    email: String
    name: String
  }
`;
export default typeDefs;
