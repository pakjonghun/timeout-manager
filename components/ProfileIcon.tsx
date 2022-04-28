import { NextPage } from "next";
import { useAppSelector } from "@libs/client/useRedux";
import { Role } from "@prisma/client";

interface props {
  name: string;
  role: Role;
  file?: string;
}

const ProfileIcon: NextPage<props> = ({ name, role, file }) => {
  const avatar = useAppSelector((state) => state.user.avatar);
  return (
    <div className="flex items-center justify-start w-fit space-x-3 p-5 cursor-pointer scale transition">
      <img
        className="rounded-full w-8 h-8"
        alt={"avatar"}
        src={file ? file : avatar}
      />
      <div className="flex flex-col font-md">
        <h3 className="text-gray-800">{name}</h3>
        <small className="text-gray-400">{role}</small>
      </div>
    </div>
  );
};

export default ProfileIcon;
