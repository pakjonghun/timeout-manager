import { UserStatusType } from "@libs/client/types";
import { NextPage } from "next";
import { SizeType } from "@libs/client/types/styleTypes";
import { joinStyleClass } from "@libs/client/utils";

interface props {
  size?: SizeType;
  status: UserStatusType;
}

const Label: NextPage<props> = ({ status, size = "sm" }) => {
  const paddings = {
    sm: "py-[0.4rem] px-2",
    md: "py-[0.5rem] px-4",
    lg: "py-[0.6rem] px-6",
  };

  const fonts = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  };

  return (
    <span
      className={joinStyleClass(
        "first-letter:uppercase text-xs roundShadow-md",
        paddings[size],
        fonts[size],
        status === "working"
          ? "bg-green-200 text-green-500"
          : "bg-yellow-200 text-yellow-500"
      )}
    >
      {status}
    </span>
  );
};

export default Label;
