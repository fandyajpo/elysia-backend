import { gql } from "@elysiajs/apollo";

const data = [
  {
    title: "Elysia",
    author: "saltyAom",
  },
  {
    title: "Hono",
    author: "fandy",
  },
];

export const bookTypeDefs = gql`
  type Book {
    title: String!
    author: String!
  }

  type Query {
    book: [Book]
    findBook(title: String): Book
  }
`;

export const bookResolvers = {
  Query: {
    book: () => data,
    findBook: (_: any, { title }: { title: string }) =>
      data.find((s) => s.title === title),
  },
};
