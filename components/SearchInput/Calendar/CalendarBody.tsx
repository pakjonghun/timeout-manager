import { NextPage } from "next";
import { format, set } from "date-fns";
import { joinStyleClass } from "@libs/client/utils";
import React from "react";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import {
  removeDates,
  setEndDate,
  setStartDate,
  setDates,
} from "@store/reducer/search";
import { CalendarSelect } from "@libs/client/types";

interface props {
  selectType: CalendarSelect;
  date: Date[];
  month: number;
}

const CalendarBody: NextPage<props> = ({ selectType, date, month }) => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector((state) => state.search.startDate);
  const endDate = useAppSelector((state) => state.search.endDate);
  const dates = useAppSelector((state) => state.search.dates);

  const onDateChange = (event: React.FormEvent<HTMLDivElement>) => {
    const value = (event.target as HTMLInputElement).value;
    switch (selectType) {
      case "all":
        if (endDate) {
          dispatch(setStartDate(value));
          dispatch(setEndDate(""));
        } else {
          if (!startDate) dispatch(setStartDate(value));
          else dispatch(setEndDate(value));
        }

        break;

      default:
        if (dates.includes(value)) {
          dispatch(removeDates(value));
        } else dispatch(setDates(value));
        break;
    }
  };

  return (
    <div
      onChange={onDateChange}
      className="grid grid-cols-7 text-gray-400 select-none text-sm"
    >
      {date.map((v, i) => {
        const key = format(v, "yyyy-MM-dd 00:00:00");
        const isCurMonth = +format(v, "M") === month;
        switch (selectType) {
          case "all":
            const one = new Date(startDate || "").getTime();
            const other = new Date(endDate || "").getTime();
            const max = Math.max(one, other);
            const min = Math.min(one, other);
            const cur = new Date(key).getTime();

            const isSelected = max > cur && cur > min;
            const isBetweenOf = cur === one || cur === other;
            const isWeekend = isCurMonth && !isSelected;

            return (
              <label
                key={key}
                className={joinStyleClass(
                  "py-[0.3rem] text-center",
                  i === 5 && isWeekend ? "text-sky-400" : "",
                  i === 6 && isWeekend ? "text-red-400" : "",
                  isBetweenOf ? "bg-pink-500 text-pink-50" : "",
                  isSelected ? "bg-pink-300 text-pink-50" : "",
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

          case "sep":
            const curDate = format(
              set(v, { hours: 0, minutes: 0, seconds: 0 }),
              "yyyy-MM-dd HH:mm:ss"
            );

            const isInclude = dates.includes(curDate);

            return (
              <label
                key={key}
                className={joinStyleClass(
                  "py-[0.3rem] text-center",
                  i === 5 && !isInclude && isCurMonth ? "text-sky-400" : "",
                  i === 6 && !isInclude && isCurMonth ? "text-red-400" : "",
                  isInclude ? "bg-pink-400 text-purple-50" : "",
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
            return null;
        }
      })}
    </div>
  );
};

export default CalendarBody;
