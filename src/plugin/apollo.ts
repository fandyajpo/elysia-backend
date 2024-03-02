import { apollo } from "@elysiajs/apollo";
import Elysia from "elysia";
import { bookResolvers, bookTypeDefs } from "graph/book";
import { userResolvers, userTypeDefs } from "graph/user";
export const withApollo = new Elysia()
  .use(
    apollo({
      typeDefs: [bookTypeDefs, userTypeDefs],
      resolvers: [bookResolvers, userResolvers],
    })
  )
  .listen(8080);
