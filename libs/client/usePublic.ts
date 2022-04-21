import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

const usePublic = () => {
  const { data: me } = useSWR("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (me !== undefined && me.success) {
      router.push("/");
    }
  }, [me]);

  return me === undefined || me?.success;
};

export default usePublic;
