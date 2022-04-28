import { useEffect } from "react";
import Spin from "./Spin";
import { useAppDispatch } from "@libs/client/useRedux";
import { avatarUrlMaker } from "@libs/client/utils";
import { setAvatar, setRole } from "@store/reducer/user";
import { useGetMeQuery } from "@store/services/user";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const PrivateLoader = () => {
  const router = useRouter();
  const { data: me } = useGetMeQuery("1");
  const { data: meWithRole } = useGetMeQuery("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (me && !me.success) {
      toast.error("잘못된 유저 정보 입니다.");
      router.push("/login");
    }

    if (me && me.user && meWithRole && meWithRole.user) {
      dispatch(setRole(meWithRole.user.role));
      if (me.user.avatar) {
        dispatch(setAvatar(avatarUrlMaker(me.user.avatar)));
      }
    }
  }, [me, router, meWithRole, dispatch]);

  if (me === undefined || !me?.success) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-[110] bg-white">
        <Spin classes="w-28 h-28 fill-gray-200" />
      </div>
    );
  } else return null;
};

export default PrivateLoader;
