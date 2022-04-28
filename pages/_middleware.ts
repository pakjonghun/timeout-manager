import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicUrls = ["login", "join", "auth"];

function checkIsPublic(pathname: string) {
  for (const url of publicUrls) {
    if (pathname.includes(url)) return true;
  }
  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApi = pathname.includes("api");
  const isPublic = checkIsPublic(pathname);

  function redirect(path: string) {
    const url = req.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url);
  }

  if (isApi) return NextResponse.next();

  if (!isPublic && !req.cookies.authorization) {
    return redirect("login");
  }

  if (isPublic && req.cookies.authorization) {
    return redirect("/");
  }
}
