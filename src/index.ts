import { Elysia } from "elysia";
import { authApi } from "./api/auth";
import { withApollo } from "plugin/apollo";
const app = new Elysia()
  .onStart(() => {
    console.log("RUNNING");
  })
  .onRequest(({ request }) => {
    console.log("REQUESTED", request);
  })

  .use(withApollo)
  .use(authApi)
  .get("/", async () => {
    const password = "fandy";

    const hash = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });
    const isMatch = await Bun.password.verify(password, hash);
    return hash;
  })
  .listen(3005);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
