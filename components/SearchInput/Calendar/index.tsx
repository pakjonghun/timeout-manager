import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import CalendarTHead from "./THead";
import CalendarHeader from "./Header";
import CalendarBody from "./CalendarBody";
import { getMonthDateList } from "@libs/client/utils";
import { motion, AnimatePresence } from "framer-motion";

interface props {
  year: number;
  month: number;
  isCaneldarShow: boolean;
  dates: string[];
  selectType: string;
  onSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeDates: (date: string) => void;
  onDates: (date: string) => void;
  onYear: (year: number) => void;
  onMonth: (month: number) => void;
  onCalendar: () => void;
  resetDates: () => void;
}

const Calendar: NextPage<props> = ({
  selectType,
  onSwitch,
  dates,
  onDates,
  onCalendar,
  resetDates,
  removeDates,
  ...props
}) => {
  const dayList = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const { year, month, isCaneldarShow } = props;

  const [monthDateList, setMonthDateList] = useState(
    getMonthDateList(year, month)
  );

  useEffect(() => {
    setMonthDateList(getMonthDateList(year, month));
  }, [year, month]);

  const onDateChange = (event: React.FormEvent<HTMLDivElement>) => {
    const value = (event.target as HTMLInputElement).value;
    if (dates.includes(value)) return removeDates(value);
    onDates(value);
  };

  if (!isCaneldarShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        className="absolute space-y-4 p-3 w-[17.7rem] bg-white border-2 origin-top roundShadow-md z-30"
      >
        <CalendarHeader
          onSwitch={onSwitch}
          selectType={selectType}
          {...props}
        />
        <CalendarTHead data={dayList} />
        {monthDateList.map((v, i) => (
          <CalendarBody
            onDateChange={onDateChange}
            selectType={selectType}
            dates={dates}
            idxLen={[i, monthDateList.length]}
            key={`${year}-${month}-${i}`}
            date={v}
            month={month}
          />
        ))}
        <div className="grid grid-cols-2 gap-5">
          <button
            type="button"
            onClick={() => {
              resetDates();
              onCalendar();
            }}
            className="py-2 px-5 bg-gray-50 text-gray-500 roundShadow-md font-medium text-sm scale"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onCalendar()}
            className="py-2 px-5 bg-blue-400 text-blue-50 roundShadow-md font-medium text-sm scale"
          >
            Apply
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Calendar;
