import { NextPage } from "next";
import { DateRecordAdminRowType } from "@libs/client/types/dataTypes";

interface props {
  data: DateRecordAdminRowType;
  styles?: React.CSSProperties;
  onClick?: () => void;
}

const DateRecordRow: NextPage<props> = ({ onClick, data, styles }) => {
  const { no, date, person, durationAverage } = data;

  return (
    <li
      {...(onClick && { onClick })}
      style={styles}
      className="grid grid-cols-7 py-4 place-items-center font-medium opacity-60 z-10 transition scale hover:opacity-100 cursor-pointer"
    >
      <span className="font-md">{no}</span>
      <span className="col-span-2 font-md">{date}</span>
      <span className="col-span-2 font-md">{person}</span>
      <span className="col-span-2 font-md">{durationAverage}</span>
    </li>
  );
};

export default DateRecordRow;
