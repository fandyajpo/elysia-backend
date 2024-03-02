import { gql } from "@elysiajs/apollo";
import { ArgumentNode } from "graphql";

const data = [
  {
    id: "2",
    username: "Elysia",
  },
  {
    id: "3",
    username: "Hono",
  },
];

export const userTypeDefs = gql`
  type User {
    id: String
    username: String
  }

  type Query {
    user: [User]
    findUser(id: String): User
  }
`;

export const userResolvers = {
  Query: {
    user: () => data,
    findUser: (_: ArgumentNode, { id }: { id: string }) =>
      data.find((s) => s.id === id),
  },
};
