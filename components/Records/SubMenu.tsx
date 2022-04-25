import { ReactText } from "react";
import { NextPage } from "next";
import SubTitle from "./SubTitle";
import LoadingButton from "@components/LoadingButton";
import { useAppSelector } from "@libs/client/useRedux";

interface props {
  isDeleted: boolean;
  onDeleteModalShow: () => ReactText | undefined;
}

const SubMenu: NextPage<props> = ({ isDeleted, onDeleteModalShow }) => {
  const userRole = useAppSelector((state) => state.user.role);
  if (userRole !== "ADMIN") return null;

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
      <SubTitle />
    </div>
  );
};

export default SubMenu;
