import { NextPage } from "next";
import { RoleType, SizeType } from "@libs/client/types/styleTypes";
import { joinStyleClass } from "@libs/client/utils";

interface props {
  indicator: React.ReactNode;
  role: RoleType;
  styles?: React.CSSProperties;
  size?: SizeType;
}

const Icon: NextPage<props> = ({
  indicator,
  styles,
  role = "success",
  size = "sm",
}) => {
  const sizes = {
    ["sm" as string]: "p-[0.4rem]",
    md: "p-[0.6rem]",
    lg: "p-[0.8rem]",
  };

  const bgColors = {
    success: "bg-green-400",
    warning: "bg-yellow-400",
    error: "bg-red-400",
  };

  return (
    <div
      style={{
        ...styles,
      }}
      className={joinStyleClass(
        "rounded-full",
        bgColors[role],
        size ? sizes[size] : ""
      )}
    >
      {indicator && indicator}
    </div>
  );
};

export default Icon;
