import { NextPage } from "next";
import { Role } from "@prisma/client";
import gravatar from "gravatar";

interface props {
  name: string;
  role: Role;
  avatar?: string;
}

const ProfileIcon: NextPage<props> = ({ name, role, avatar }) => {
  return (
    <div className="flex items-center justify-start w-fit space-x-3 p-5 cursor-pointer scale transition">
      <img
        className="rounded-full w-8 h-8"
        alt={"avatar"}
        src={
          avatar
            ? avatar
            : `http://${gravatar.url("name", {
                s: "34",
                d: "retro",
              })}`
        }
      />
      <div className="flex flex-col font-md">
        <h3 className="text-gray-800">{name}</h3>
        <small className="text-gray-400">{role}</small>
      </div>
    </div>
  );
};

export default ProfileIcon;
