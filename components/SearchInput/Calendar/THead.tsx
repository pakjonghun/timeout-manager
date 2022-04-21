import { NextPage } from "next";

interface props {
  data: string[];
}

const CalendarTHead: NextPage<props> = ({ data }) => {
  return (
    <div className="grid grid-cols-7 text-sm text-gray-400 select-none">
      {data.map((v) => (
        <span key={v} className="text-center first-letter:uppercase">
          {v}
        </span>
      ))}
    </div>
  );
};

export default CalendarTHead;
