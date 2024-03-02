import Elysia from "elysia";
import { cookie } from "@elysiajs/cookie";

export const withCookie = new Elysia().use(cookie());
