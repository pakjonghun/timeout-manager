import { ReactText } from "react";
import { NextPage } from "next";
import SubTitle from "./SubTitle";
import LoadingButton from "@components/LoadingButton";
import { MeType } from "@libs/server/types";
import useSWR from "swr";

interface props {
  isDeleted: boolean;
  recordUrl: string;
  onDeleteModalShow: () => ReactText | undefined;
}

const SubMenu: NextPage<props> = ({
  isDeleted,
  recordUrl,
  onDeleteModalShow,
}) => {
  const { data: me } = useSWR<MeType>("/api/users/me");

  if (me?.user?.role !== "ADMIN") return null;

  return (
    <div className="self-end flex justify-between">
      <div className="flex items-center space-x-3 ml-7">
        <LoadingButton
          attributes={{ onClick: onDeleteModalShow }}
          loadedClasses="bg-blue-500 text-blue-50 text-sm"
          loadingClasses="bg-blue-100 text-blue-500 text-sm"
          isLoading={isDeleted}
          buttonName="Delete"
        />
      </div>
      <SubTitle recordUrl={recordUrl} />
    </div>
  );
};

export default SubMenu;
