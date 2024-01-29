import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { withJwt } from "plugin/jwt";
export const authApi = new Elysia()
  .use(withJwt)
  .use(cookie())
  .group("/auth", (app) =>
    app
      .derive(({ headers }) => {
        const auth = headers["Authorization"];
        const bearer = auth?.replace?.("Bearer ", "");
        return {
          accessToken: "",
          refreshToken: "",
        };
      })
      .get("/", () => "Auth Route")
      .get("/:email", async ({ jwt, params, setCookie }) => {
        const token = await jwt.sign(params);
        setCookie("nimble", token, {
          httpOnly: true,
        });
        return `Sign in as ${token}`;
      })
      .get("/checker", async ({ jwt, cookie }) => {
        const token = cookie?.["nimble"];
        const checker = await jwt.verify(token);
        return checker;
      })
      .get(
        "/profile",
        async ({ jwt, cookie }) => {
          const token = cookie?.["nimble"];
          const checker = await jwt.verify(token);
          return { checker };
        },
        {
          beforeHandle: async ({ jwt, cookie }) => {
            const token = cookie?.["nimble"];
            const checker = await jwt.verify(token);
            if (checker === false) return { status: "unauthorize" };
          },
        }
      )
  );
