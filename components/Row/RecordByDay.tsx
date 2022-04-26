import { NextPage } from "next";
import { RecordByDay } from "@libs/server/types/dataTypes";
import { getDuration } from "@libs/client/utils";

interface props {
  data: RecordByDay;
  onClick: (day: string) => void;
  styles?: React.CSSProperties;
}

const AdminNameRecordRow: NextPage<props> = ({ data, styles, onClick }) => {
  const { _avg, _count, day } = data;
  if (!data) return null;
  return (
    <li
      onClick={() => onClick(day)}
      style={styles}
      className="grid grid-cols-9 py-4 place-items-center font-medium opacity-60 z-10 transition scale hover:opacity-100 cursor-pointer"
    >
      <span className="col-span-3 font-md">{day}</span>
      <span className="col-span-2 font-md">{_count.start}</span>
      <span className="col-span-2 font-md">
        {_avg.duration ? getDuration(_avg.duration) : "-"}
      </span>
      <span className="col-span-2 font-md">{_count.end}</span>
    </li>
  );
};

export default AdminNameRecordRow;
