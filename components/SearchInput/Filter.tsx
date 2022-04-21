import { NextPage } from "next";
import { useCallback, useState } from "react";
import Calendar from "./Calendar";
import DatePickForm from "./Calendar/DatePickForm";
import Select from "./Select";

interface props {
  year: number;
  month: number;
  dates: string[];
  removeDates: (date: string) => void;
  onDates: (date: string) => void;
  onClose: (event: React.MouseEvent) => void;
  onYear: (year: number) => void;
  onMonth: (month: number) => void;
  resetDates: () => void;
}

const data = [
  { name: "description", id: "title" },
  { name: "description", id: "name" },
  { name: "description", id: "duration" },
];

const Filter: NextPage<props> = ({
  year,
  month,
  dates,
  resetDates,
  onClose,
  removeDates,
  ...prop
}) => {
  const [standard, setStandard] = useState("Standard");
  const [selectList] = useState(data);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isCaneldarShow, setIsCalendarShow] = useState(false);

  const onTerm = useCallback(
    (event: React.FormEvent<HTMLUListElement>) => {
      const value = (event.target as HTMLInputElement).value;
      setStandard(value);
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

  const [selectType, setSelectType] = useState("all");

  const onSwitch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      resetDates();
      setSelectType(event.target.checked ? "sep" : "all");
    },
    [resetDates]
  );

  if (selectType === "all" && dates.length === 2) {
    const one = new Date(`${dates[0]} 00:00:00`).getTime();
    const other = new Date(`${dates[1]} 00:00:00`).getTime();

    const beforeDate = one > other ? dates[1] : dates[0];
    const afterDate = one > other ? dates[0] : dates[1];

    return (
      <div className="roundShadow-md p-5 space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h3 className="ml-1 font-md text-gray-500">DateFilter</h3>
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
            <Calendar
              selectType={selectType}
              dates={dates}
              onSwitch={onSwitch}
              removeDates={removeDates}
              resetDates={resetDates}
              onCalendar={onCalendar}
              isCaneldarShow={isCaneldarShow}
              year={year}
              month={month}
              {...prop}
            />
          </div>
          <div>
            <h3 className="ml-1 mb-2 font-md text-gray-500">Search Standard</h3>
            <div>
              <Select
                selectOption={standard}
                data={selectList}
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
            // onClick={onConfirmModal}
            className="py-2 px-5 bg-blue-400 text-blue-50 roundShadow-md font-medium text-sm scale"
          >
            Apply
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="roundShadow-md p-5 space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <h3 className="ml-1 font-md text-gray-500">DateFilter</h3>
          <div className="grid grid-cols-2 gap-2">
            <DatePickForm
              selectType={selectType}
              date={selectType === "all" ? dates[0] : ""}
              onCalendar={onCalendar}
            />
            {selectType === "all" && (
              <DatePickForm
                selectType={selectType}
                date={""}
                onCalendar={onCalendar}
              />
            )}
          </div>
          <Calendar
            selectType={selectType}
            dates={dates}
            onSwitch={onSwitch}
            removeDates={removeDates}
            resetDates={resetDates}
            onCalendar={onCalendar}
            isCaneldarShow={isCaneldarShow}
            year={year}
            month={month}
            {...prop}
          />
        </div>
        <div>
          <h3 className="ml-1 mb-2 font-md text-gray-500">Search Standard</h3>
          <div>
            <Select
              selectOption={standard}
              data={selectList}
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
          // onClick={onConfirmModal}
          className="py-2 px-5 bg-blue-400 text-blue-50 roundShadow-md font-medium text-sm scale"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
