import { Role } from "@prisma/client";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      role: Role;
    };
  }
}

const option = {
  cookieName: "authorization",
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  },
};

const withCookie = (func: any) => {
  return withIronSessionApiRoute(func, option);
};

export const withSSRCookie = (func: any) => {
  return withIronSessionSsr(func, option);
};

export default withCookie;
