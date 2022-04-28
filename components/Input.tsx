import { NextPage } from "next";
import { SizeType } from "@libs/client/types/styleTypes";
import { joinStyleClass } from "@libs/client/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface props {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  attributes?: React.HTMLInputTypeAttribute;
  styles?: React.CSSProperties;
  type?: "text" | "number";
  role?: "desc" | "title";
  size?: SizeType;
  isRequire?: boolean;
  classes?: string;
}

const Input: NextPage<props> = ({
  id,
  label,
  placeholder = "",
  attributes,
  styles,
  type = "text",
  size = "sm",
  role = "title",
  isRequire = true,
  register,
  classes,
}) => {
  const widths = {
    ["sm" as string]: "w-[286.47px]",
    md: "w-[328px]",
    lg: "w-[356px]",
  };

  return (
    <label htmlFor={id} className="flex flex-col">
      <span
        className={joinStyleClass(
          "first-letter:uppercase",
          isRequire ? "after:content-['*'] after:ml-1 after:text-red-500" : ""
        )}
      >
        {label}
      </span>
      {role === "title" && (
        <input
          {...register}
          type={type}
          {...attributes}
          style={styles}
          placeholder={placeholder}
          id={id}
          disabled={id === "loginEmail"}
          className={joinStyleClass(
            "normalInput",
            widths[size],
            classes ? classes : ""
          )}
        />
      )}

      {role === "desc" && (
        <textarea
          {...attributes}
          {...register}
          style={styles}
          placeholder={placeholder}
          id={id}
          className={joinStyleClass("normalInput", widths[size])}
        />
      )}
    </label>
  );
};

export default Input;
