import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLogoutQuery } from "@store/services/user";
import { toast } from "react-toastify";
import { useAppDispatch } from "@libs/client/useRedux";
import { reset as searchReset } from "@store/reducer/search";
import { reset as userReset } from "@store/reducer/user";
import { reset as recordReset } from "@store/reducer/record";

const Logout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isError, isSuccess } = useLogoutQuery();

  useEffect(() => {
    if ((data && !data.success) || isError) {
      toast.error("로그아웃을 실패했습니다.");
      router.push("/");
    }

    if (isSuccess) router.push("/login");

    return () => {
      dispatch(userReset());
      dispatch(recordReset());
      dispatch(searchReset());
    };
  }, [data, isError, isSuccess, router, dispatch]);

  return <></>;
};

export default Logout;
