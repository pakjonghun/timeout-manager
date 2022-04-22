import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Logo from "@components/Layout/Logo";
import Spin from "@components/Spin";
import Title from "@components/Title";
import SideMenus from "@components/Layout/SideMenus";
import MainNavMenus from "@components/Layout/MainNavMenus";
import { toast } from "react-toastify";
import { useAppDispatch } from "@libs/client/useRedux";
import { useGetMeStatusQuery } from "@store/services/user";
import { setRole, setStatus } from "@store/reducer/userReducer";

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
  const dispatch = useAppDispatch();
  const { data: me, refetch } = useGetMeStatusQuery("status=1");

  useEffect(() => {
    if (me !== undefined && !me.success) {
      toast.error("잘못된 유저 정보 입니다.");
      router.push("/login");
    }

    if (me?.user?.status) dispatch(setStatus(me.user.status));
    if (me?.user?.role) dispatch(setRole(me.user.role));
  }, [me]);

  if (me === undefined || !me?.success) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin classes="w-28 h-28 fill-gray-200" />
      </div>
    );
  }

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
              <MainNavMenus />
            </ul>

            <ul className="flex items-center space-x-5">
              <SideMenus />
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
