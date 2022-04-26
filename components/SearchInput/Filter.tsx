import { NextPage } from "next";
import { useCallback, useState } from "react";
import { CalendarSelect, RecordStandard } from "@libs/client/types";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import {
  hideFilter,
  resetDate,
  resetDates,
  setStandard,
} from "@store/reducer/search";
import Calendar from "./Calendar";
import DatePickForm from "./Calendar/DatePickForm";
import Select from "./Select";
import { useGetRecordWorkTimesQuery } from "@store/services/records";
import { format } from "date-fns";

interface props {
  onClose: (event: React.MouseEvent) => void;
}

const Filter: NextPage<props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const standard = useAppSelector((state) => state.search.standard);
  const [tempStandard, setTempStandard] = useState<RecordStandard>(standard);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isCaneldarShow, setIsCalendarShow] = useState(false);

  const onTerm = useCallback(
    (event: React.FormEvent<HTMLUListElement>) => {
      const value = (event.target as HTMLInputElement).value as RecordStandard;
      setTempStandard(value);
      setIsSelectOpen(!isSelectOpen);
    },
    [isSelectOpen]
  );

  const onCalendar = useCallback(() => {
    setIsCalendarShow(!isCaneldarShow);
  }, [isCaneldarShow]);

  const onToggleSelect = useCallback(() => {
    setIsSelectOpen(!isSelectOpen);
  }, [isSelectOpen]);

  const [selectType, setSelectType] = useState<CalendarSelect>("all");

  const onSwitch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(resetDate());
      dispatch(resetDates());
      setSelectType(event.target.checked ? "sep" : "all");
    },
    [dispatch]
  );

  const { refetch } = useGetRecordWorkTimesQuery();

  const onApply = useCallback(() => {
    dispatch(setStandard(tempStandard));
    dispatch(hideFilter());
    refetch();
  }, [tempStandard, refetch, dispatch]);

  const startDate = useAppSelector((state) => state.search.startDate) || "";
  const endDate = useAppSelector((state) => state.search.endDate) || "";
  const selectedDateList = useAppSelector((state) => state.search.dates);

  const one = startDate ? new Date(startDate).getTime() : "";
  const other = endDate ? new Date(endDate || "").getTime() : "";

  let beforeDate = "";
  let afterDate = "";
  if (one && other) {
    beforeDate = one > other ? endDate : startDate;
    afterDate = one > other ? startDate : endDate;
  } else {
    beforeDate = startDate;
  }

  return (
    <div className="roundShadow-md p-5 space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <h3 className="ml-1 font-md text-gray-500">DateFilter</h3>
          {selectType === "all" ? (
            <div className="grid grid-cols-2 gap-2 ">
              <DatePickForm
                selectType={selectType}
                date={beforeDate}
                onCalendar={onCalendar}
              />
              {selectType === "all" && (
                <DatePickForm
                  selectType={selectType}
                  date={afterDate}
                  onCalendar={onCalendar}
                />
              )}
            </div>
          ) : (
            <ul className="flex my-2">
              <li
                onClick={onCalendar}
                className="flex space-x-2 items-center py-3 sm:px-5 roundShadow-md scale-md cursor-pointer"
              >
                <span className="block h-4 font-medium text-xs text-gray-600">
                  Dates :
                </span>
              </li>
              {selectedDateList.slice(0, 2).map((date) => (
                <li
                  onClick={onCalendar}
                  className="flex space-x-2 items-center py-3 sm:px-5 bg-gray-100 roundShadow-md scale-md cursor-pointer"
                  key={date}
                >
                  <span className="block font-medium text-xs text-gray-600">
                    {format(new Date(date), "MM/dd")}
                  </span>
                </li>
              ))}
              {selectedDateList.length >= 2 && <li className="ml-2">...</li>}
            </ul>
          )}
          <Calendar
            selectType={selectType}
            onSwitch={onSwitch}
            onCalendar={onCalendar}
            isCaneldarShow={isCaneldarShow}
          />
        </div>
        <div>
          <h3 className="ml-1 mb-2 font-md text-gray-500">Search Standard</h3>
          <div>
            <Select
              selectOption={tempStandard}
              isSelectOpen={isSelectOpen}
              onSelect={onTerm}
              onToggleOption={onToggleSelect}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <button
          type="button"
          onClick={onClose}
          className="py-2 px-5 bg-gray-50 text-gray-500 roundShadow-md font-medium text-sm scale"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onApply}
          className="py-2 px-5 bg-blue-400 text-blue-50 roundShadow-md font-medium text-sm scale"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
