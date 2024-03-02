import { Elysia, t } from "elysia";
import { withCookie } from "plugin/cookie";
import { withJwt } from "plugin/jwt";
export const authApi = new Elysia({ prefix: "v1" })
  .use(withJwt)
  .use(withCookie)
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
      .post("/login", ({ body }) => body, {
        body: t.Object({
          x: t.Optional(t.Number()),
          y: t.Optional(t.Number()),
        }),
      })
      .post("/:email", async ({ jwt, params, setCookie }) => {
        const token = await jwt.sign(params);
        setCookie("nimble", token);
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
