import { NextPage } from "next";
import { format } from "date-fns";
import { joinStyleClass } from "@libs/client/utils";
import React from "react";

interface props {
  selectType: string;
  idxLen: [number, number];
  date: Date[];
  dates: string[];
  month: number;
  onDateChange: (event: React.FormEvent<HTMLDivElement>) => void;
}

const CalendarBody: NextPage<props> = ({
  selectType,
  dates,
  date,
  month,
  idxLen,
  onDateChange,
}) => {
  return (
    <div
      onChange={onDateChange}
      className="grid grid-cols-7 text-gray-400 select-none text-sm"
    >
      {date.map((v, i) => {
        const key = format(v, "yyyy-MM-dd");
        const isCurMonth = +format(v, "M") === month;
        const isIncludes = dates.includes(key);

        switch (true) {
          case selectType === "all" && dates.length === 2:
            const one = new Date(`${dates[0]} 00:00:00`).getTime();
            const other = new Date(`${dates[1]} 00:00:00`).getTime();
            const max = Math.max(one, other);
            const min = Math.min(one, other);
            const cur = new Date(v).getTime();
            const isSelected = max >= cur && cur >= min;

            return (
              <label
                key={key}
                className={joinStyleClass(
                  "py-[0.3rem] text-center pointer-events-none text-gray-200",

                  isSelected ? "bg-pink-400 text-purple-50" : "",
                  !isCurMonth ? "text-gray-200 pointer-events-none" : ""
                )}
                htmlFor={key}
              >
                <span className="cursor-pointer">{v.getDate()}</span>
                <input
                  value={key}
                  id={key}
                  type="checkbox"
                  className="hidden"
                />
              </label>
            );

          case !idxLen[0] || idxLen[0] === idxLen[1] - 1:
            return (
              <label
                key={key}
                className={joinStyleClass(
                  "py-[0.3rem] text-center",
                  i === 5 ? "text-sky-400" : "",
                  i === 6 ? "text-red-400" : "",
                  isIncludes ? "bg-pink-400 text-purple-50" : "",
                  !isCurMonth ? "text-gray-200 pointer-events-none" : ""
                )}
                htmlFor={key}
              >
                <span className="cursor-pointer">{v.getDate()}</span>
                <input
                  value={key}
                  id={key}
                  type="checkbox"
                  className="hidden"
                />
              </label>
            );

          default:
            return (
              <label
                key={key}
                className={joinStyleClass(
                  "py-[0.3rem] text-center",
                  i === 5 ? "text-sky-400" : "",
                  i === 6 ? "text-red-400" : "",
                  isIncludes ? "bg-pink-400 text-purple-50" : ""
                )}
                htmlFor={key}
              >
                <span className="cursor-pointer">{v.getDate()}</span>
                <input
                  value={key}
                  id={key}
                  type="checkbox"
                  className="hidden"
                />
              </label>
            );
        }
      })}
    </div>
  );
};

export default CalendarBody;
