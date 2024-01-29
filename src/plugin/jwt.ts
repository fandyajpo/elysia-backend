import Elysia from "elysia";
import jwt from "@elysiajs/jwt";

export const withJwt = new Elysia().use(
  jwt({
    exp: "10s",
    name: "jwt",
    secret: process.env.ELYSIA_JWT_SECRET!,
  })
);
