import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import CalendarTHead from "./Thead";
import CalendarHeader from "./Header";
import CalendarBody from "./CalendarBody";
import { getMonthDateList } from "@libs/client/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@libs/client/useRedux";
import { CalendarSelect } from "@libs/client/types";
import { resetDates } from "@store/reducer/search";

interface props {
  isCaneldarShow: boolean;
  selectType: CalendarSelect;
  onSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCalendar: () => void;
}

const Calendar: NextPage<props> = ({
  selectType,
  isCaneldarShow,
  onSwitch,
  onCalendar,
}) => {
  const dayList = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
  }, []);

  const onYear = useCallback(
    (year: number) => setYear((pre) => (year > 0 ? year : pre)),
    []
  );

  const onMonth = useCallback(
    (month: number) =>
      setMonth((pre) => (month > 0 && month < 13 ? month : pre)),
    []
  );

  const [monthDateList, setMonthDateList] = useState(
    getMonthDateList(year, month)
  );

  useEffect(() => {
    setMonthDateList(getMonthDateList(year, month));
  }, [year, month]);

  const dispatch = useAppDispatch();
  const onCancelClick = useCallback(() => {
    dispatch(resetDates());
    onCalendar();
  }, [dispatch, onCalendar]);

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
          onYear={onYear}
          onMonth={onMonth}
          year={year}
          month={month}
        />
        <CalendarTHead data={dayList} />
        {monthDateList.map((v, i) => (
          <CalendarBody
            selectType={selectType}
            key={`${year}-${month}-${i}`}
            date={v}
            month={month}
          />
        ))}
        <div className="grid grid-cols-2 gap-5">
          <button
            type="button"
            onClick={onCancelClick}
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
