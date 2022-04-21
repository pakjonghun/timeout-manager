import { NextPage } from "next";
import { UserRecord } from "@libs/server/types";
import { getDuration, joinStyleClass } from "@libs/client/utils";
import { format } from "date-fns";

interface props {
  data: UserRecord;
  isPickable?: boolean;
  styles?: React.CSSProperties;
  onClick?: () => void;
}

const NameRecordRow: NextPage<props> = ({
  data,
  styles,
  isPickable,
  onClick,
}) => {
  const { start, end, duration, createdAt } = data;

  if (!end || !duration) return null;

  return (
    <li
      {...(onClick && { onClick })}
      style={styles}
      className={joinStyleClass(
        "grid grid-cols-9 py-4 place-items-center font-medium opacity-60 z-10",
        isPickable ? "transition scale hover:opacity-100 cursor-pointer" : ""
      )}
    >
      <span className="col-span-3 font-md">
        {format(new Date(createdAt), "yyyy-MM-dd")}
      </span>
      <span className="col-span-2 font-md">
        {format(new Date(start), "HH:mm")}
      </span>
      <span className="col-span-2 font-md">
        {format(new Date(end), "HH:mm")}
      </span>
      <span className="col-span-2 font-md">{getDuration(duration)}</span>
    </li>
  );
};

export default NameRecordRow;
