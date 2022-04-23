import { startOfMonth, startOfWeek, getWeeksInMonth, min } from "date-fns";

export const joinStyleClass = (...args: string[]) => args.join(" ");

export const getId = () => Math.random().toString(20).substring(2, 12);

export const getFullDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

const oneDay = 1000 * 60 * 60 * 24;
const addOneDay = (curDate: Date) => new Date(curDate.getTime() + oneDay);
const getWeekDateList = (startDate: Date) => {
  let temp = new Date(startDate);

  const weekDateList = [];

  for (let i = 0; i < 7; i++) {
    weekDateList.push(temp);
    temp = addOneDay(temp);
  }

  return weekDateList;
};

export const getMonthDateList = (year: number, month: number) => {
  const standardDate = new Date(`${year}-${month}`);
  const startOfMonthWeek = startOfWeek(startOfMonth(standardDate));
  const weekLen = getWeeksInMonth(standardDate);
  const monthDateList = [];
  let temp = new Date(startOfMonthWeek);
  for (let i = 0; i < weekLen; i++) {
    const lastWeekDate = getWeekDateList(temp);
    monthDateList.push(lastWeekDate);
    temp = addOneDay(lastWeekDate[6]);
  }
  return monthDateList;
};

export const getDatePosition = (number: number) => {
  return number.toString().length > 1 ? number : `0${number}`;
};

export const getHourMinuteSecond = (duration: number) => {
  let rest = duration;
  const hour = Math.floor(rest / (1000 * 60 * 60));
  rest = rest % (1000 * 60 * 60);
  const minute = Math.floor(rest / (1000 * 60));
  rest = rest % (1000 * 60);
  const second = Math.floor(rest / 1000);

  const HH = getDatePosition(hour);
  const mm = getDatePosition(minute);
  const ss = getDatePosition(second);

  return [HH, mm, ss];
};

export const getDuration = (duration: number) => {
  const [HH, mm] = getHourMinuteSecond(duration);
  return `${HH}:${mm}`;
};

export const tagMaker = <R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  type: T
) =>
  resultsWithIds
    ? [
        ...resultsWithIds.map(({ id }) => ({ type, id })),
        { type: type as const, id: "LIST" },
      ]
    : [{ type, id: "LIST" }];

export const queryMaker = (args: { key: string; value: string | number }[]) => {
  const url = new URLSearchParams();
  args.forEach(({ key, value }) => url.append(key, value + ""));
  return url.toString();
};
