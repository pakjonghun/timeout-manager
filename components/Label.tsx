import { NextPage } from "next";
import { SizeType } from "@libs/client/types/styleTypes";
import { joinStyleClass } from "@libs/client/utils";
import { Status } from "@prisma/client";

interface props {
  size?: SizeType;
  status: Status;
}

const Label: NextPage<props> = ({ status, size = "sm" }) => {
  const paddings = {
    ["sm" as string]: "py-[0.4rem] px-2",
    md: "py-[0.5rem] px-4",
    lg: "py-[0.6rem] px-6",
  };

  const fonts = {
    ["sm" as string]: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  };

  return (
    <span
      className={joinStyleClass(
        "first-letter:uppercase text-xs roundShadow-md",
        paddings[size],
        fonts[size],
        status === "WORKING"
          ? "bg-green-200 text-green-500"
          : "bg-yellow-200 text-yellow-500"
      )}
    >
      {status}
    </span>
  );
};

export default Label;
