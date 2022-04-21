import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import client from "@libs/server/client";

const publicUrls = ["login", "join", "auth"];

function checkIsPublic(pathname: string) {
  for (const url of publicUrls) {
    if (pathname.includes(url)) return true;
  }
  return false;
}

export function middleware(req: NextRequest) {
  function redirect(path: string) {
    const url = req.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url);
  }

  const { pathname } = req.nextUrl;
  const isApi = pathname.includes("api");
  if (isApi) return NextResponse.next();

  const isPublic = checkIsPublic(pathname);
  if (!isPublic && !req.cookies.authorization) {
    return redirect("login");
  }

  if (isPublic && req.cookies.authorization) {
    return redirect("/");
  }
}
