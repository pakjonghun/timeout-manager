import { NextPage } from "next";
import AscendButton from "./AscendButton";
import DescendButton from "./DescendButton";
import SortToggleButton from "./SortToggleButton";
import { SortValue } from "@libs/client/types";

interface props {
  sort: SortValue | null;
  id: string;
}

const Sort: NextPage<props> = ({ id, sort }) => {
  return (
    <label
      htmlFor={`sort${id}`}
      className="transition scale-md fill-gray-400 hover:fill-gray-600 cursor-pointer"
    >
      {sort === "asc" && (
        <span className="block mt-[0.43rem]">
          <AscendButton />
        </span>
      )}

      {sort === "desc" && (
        <span className="block mt-[0.1rem]">
          <DescendButton />
        </span>
      )}

      {sort === null && (
        <span className="block mt-[0.25rem]">
          <SortToggleButton />
        </span>
      )}

      <input type="checkbox" value={id} id={`sort${id}`} className="hidden" />
    </label>
  );
};

export default Sort;
