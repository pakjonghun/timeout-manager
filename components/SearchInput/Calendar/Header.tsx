import { NextPage } from "next";
import Switch from "@components/Switch";
import { getId } from "@libs/client/utils";
import { CalendarSelect } from "@libs/client/types";

interface props {
  year: number;
  month: number;
  selectType: CalendarSelect;
  onSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onYear: (year: number) => void;
  onMonth: (year: number) => void;
}

const CalendarHeader: NextPage<props> = ({
  year,
  month,
  selectType,
  onYear,
  onMonth,
  onSwitch,
}) => {
  return (
    <div>
      <div className="flex items-center ml-2 mb-5">
        <Switch
          onSwitchName={
            <span key={getId()} className="text-[0.65rem] font-medium">
              Sep
            </span>
          }
          offSwitchName={
            <span key={getId()} className="text-[0.65rem] font-medium">
              All
            </span>
          }
          size={{ width: 3.7, height: 1.2 }}
          isOn={selectType === "sep"}
          onSwitch={onSwitch}
        />
      </div>
      <div className="flex justify-around items-center">
        <div
          onClick={() => onYear(year - 1)}
          className="font-bold text-[0.9rem] text-gray-400 cursor-pointer scale-md select-none shadow-sm rounded-sm w-7 aspect-square border-[1px] border-gray-300 text-center"
        >
          &laquo;
        </div>
        <div
          onClick={() => onMonth(month - 1)}
          className="font-bold text-[0.9rem] text-gray-400 cursor-pointer scale-md select-none shadow-sm rounded-sm w-7 aspect-square border-[1px] border-gray-300 text-center"
        >
          &lsaquo;
        </div>
        <h2 className="mx-3 text-gray-600 text-[1rem]">
          {year}년 {month}월
        </h2>
        <div
          onClick={() => onMonth(month + 1)}
          className="font-bold text-[0.9rem] text-gray-400 cursor-pointer scale-md select-none shadow-sm rounded-sm w-7 aspect-square border-[1px] border-gray-300 text-center"
        >
          &rsaquo;
        </div>
        <div
          onClick={() => onYear(year + 1)}
          className="font-bold text-[0.9rem] text-gray-400 cursor-pointer scale-md select-none shadow-sm rounded-sm w-7 aspect-square border-[1px] border-gray-300 text-center"
        >
          &raquo;
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
