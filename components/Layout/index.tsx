import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Logo from "@components/Layout/Logo";
import Spin from "@components/Spin";
import Title from "@components/Title";
import { sideMenus } from "@libs/client/constants";
import { mainMenus } from "@libs/client/constants";
import { toast } from "react-toastify";
import { useAppDispatch } from "@libs/client/useRedux";
import { useGetMeQuery } from "@store/services/user";
import { setRole } from "@store/reducer/user";
import Menus from "./Menus";

interface props {
  children: React.ReactNode;
  title?: string;
  canGoBack?: boolean;
  isPrivate?: boolean;
}

const Layout: NextPage<props> = ({
  canGoBack = true,
  title,
  children,
  isPrivate = true,
}) => {
  const router = useRouter();

  return (
    <div className="max-w-screen-lg h-screen min-h-max mx-auto">
      <Title title={title} />
      {isPrivate && (
        <header className="py-4 space-y-5 shadow-md">
          <nav className="flex items-center justify-between px-5 h-full">
            <ul className="flex h-full items-center space-x-5">
              <li className="mr-5">
                <Logo />
              </li>
              <Menus menus={mainMenus} />
            </ul>

            <ul className="flex items-center space-x-5">
              <Menus menus={sideMenus} />
            </ul>
          </nav>
        </header>
      )}
      {canGoBack && (
        <div className="grid grid-cols-3 w-full my-3">
          <button className="text-left pl-5" onClick={() => router.back()}>
            &larr;
          </button>
          <h1 className="block mx-auto first-letter:uppercase text-gray-600">
            {title}
          </h1>
        </div>
      )}
      {!canGoBack && title && (
        <h1 className="pl-5 my-7 first-letter:uppercase">{title}</h1>
      )}
      <main className="flex justify-center">{children}</main>
    </div>
  );
};

export default Layout;
