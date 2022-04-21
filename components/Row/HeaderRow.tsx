import { NextPage } from "next";
import Sort from "@components/Sort";
import { SizeType } from "@libs/client/types/styleTypes";
import { joinStyleClass } from "@libs/client/utils";
import React from "react";

interface props {
  options: any;
  isSelected?: boolean;
  size?: SizeType;
  styles?: React.CSSProperties;
  onSort?: (event: React.FormEvent<HTMLElement>) => void;
  onSelectAll?: () => void;
}

const HeaderRow: NextPage<props> = ({
  options,
  styles,
  size = "sm",
  isSelected,
  onSort,
  onSelectAll,
}) => {
  const titles = Object.keys(options);
  const len = titles.reduce((acc, cur) => acc + options[cur]["colSpan"], 0);

  const paddings = {
    xs: "py-[0.5rem]",
    sm: "py-[0.7rem]",
    md: "py-[0.8rem]",
    lg: "py-[0.9rem]",
  };

  return (
    <li
      {...(onSort && { onChange: onSort })}
      style={{ ...styles, gridTemplateColumns: `repeat(${len},1fr)` }}
      className={joinStyleClass(
        "sticky top-0 grid place-items-center font-medium text-gray-600 bg-gray-100 z-10",
        paddings[size],
        size === "xs" ? "text-sm" : ""
      )}
    >
      {titles.map((v) => (
        <span
          key={v}
          style={{ gridColumn: `span ${options[v]["colSpan"]}` }}
          className="flex min-w-max space-x-1"
        >
          {v === "#" ? (
            <label
              htmlFor="allSelectBoxLabel"
              className="block col-span-1 w-full font-md z-30 cursor-pointer select-none text-gray-600"
            >
              <div
                id="allSelectContainer"
                className="w-full h-full p-2 aspect-square"
              >
                <span
                  id="selectRecordBox"
                  className={joinStyleClass(
                    "relative block w-5 aspect-square text-center border-2",
                    isSelected ? "border-gray-500" : ""
                  )}
                >
                  {isSelected && (
                    <span
                      className="absolute inset-0 text-xs font-bold "
                      id="allSelectCheck"
                    >
                      &#10003;
                    </span>
                  )}
                </span>
              </div>
              <input
                onClick={onSelectAll}
                type="checkbox"
                value="allSelectBoxLabel"
                className="hidden"
                id="allSelectBoxLabel"
              />
            </label>
          ) : (
            <span>{v.toUpperCase()}</span>
          )}

          {options[v]["sort"] !== undefined && (
            <Sort id={v} sort={options[v]["sort"]} />
          )}
        </span>
      ))}
    </li>
  );
};

export default HeaderRow;
