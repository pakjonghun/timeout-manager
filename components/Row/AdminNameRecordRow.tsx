import { NextPage } from "next";
import { getDuration, joinStyleClass } from "@libs/client/utils";
import { format } from "date-fns";

interface props {
  data: UserRecordWithUser;
  isPickable?: boolean;
  isSelected: boolean;
  onSelect: (event: React.MouseEvent<HTMLLIElement>) => void;
  onClick: (event: React.MouseEvent, data: UserRecordWithUser) => void;
  styles?: React.CSSProperties;
}

const AdminNameRecordRow: NextPage<props> = ({
  data,
  styles,
  isPickable,
  isSelected,
  onClick,
  onSelect,
}) => {
  const { start, end, duration, user, id } = data;
  return (
    <li
      onChange={onSelect}
      onClick={(event: React.MouseEvent) => onClick(event, data)}
      style={styles}
      className={joinStyleClass(
        "grid grid-cols-9 py-4 place-items-center font-medium opacity-60 z-10",
        isPickable ? "transition scale hover:opacity-100 cursor-pointer" : "",
        end || duration ? "text-gray-500" : "text-red-600 font-bold"
      )}
    >
      <label
        htmlFor={id + ""}
        className="block col-span-1 w-full font-md z-30 cursor-default select-none text-gray-600"
      >
        <div id="selectRecord" className="flex justify-center items-center">
          <span
            id="selectRecordBox"
            className={joinStyleClass(
              "relative block w-5 aspect-square text-center border-2",
              isSelected ? "border-gray-500" : ""
            )}
          >
            {isSelected && (
              <span
                className="absolute inset-0 text-xs font-bold"
                id="selectCheck"
              >
                &#10003;
              </span>
            )}
          </span>
        </div>
        <input
          type="checkbox"
          value={id + ""}
          className="hidden"
          id={id + ""}
        />
      </label>
      <span className="col-span-2 font-md">{user?.name || ""}</span>
      <span className="col-span-2 font-md">
        {format(new Date(start), "HH:mm")}
      </span>
      <span className="col-span-2 font-md">
        {end ? format(new Date(end), "HH:mm") : "-"}
      </span>
      <span className="col-span-2 font-md">
        {duration ? getDuration(duration) : "-"}
      </span>
    </li>
  );
};

export default AdminNameRecordRow;
