import { NextPage } from "next";
import { getDuration } from "@libs/client/utils";
import { WorkTimes } from "@prisma/client";
import { format } from "date-fns";

interface props {
  time: Pick<WorkTimes, "start" | "end" | "duration">;
  styles?: React.CSSProperties;
}

const TimerRecordRow: NextPage<props> = ({ time, styles }) => {
  const { start, end, duration } = time;

  return (
    <li
      style={styles}
      className="grid grid-cols-3 py-2 place-items-center font-medium text-sm text-gray-500"
    >
      <span>{format(new Date(start), "HH:mm")}</span>
      <span>{end ? format(new Date(end), "HH:mm") : "-"}</span>
      <span>{duration ? getDuration(duration) : "-"}</span>
    </li>
  );
};

export default TimerRecordRow;
