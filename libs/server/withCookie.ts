import { Role } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const withCookie = (func: any) => {
  return withIronSessionApiRoute(func, {
    cookieName: "authorization",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  });
};

export default withCookie;
