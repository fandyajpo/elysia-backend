import { Elysia } from "elysia";
import { authApi } from "./api/auth";

const app = new Elysia()
  .use(authApi)
  .get("/", () => {
    return "end service";
  })
  .listen(3005);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
