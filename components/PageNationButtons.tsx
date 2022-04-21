import { NextPage } from "next";
import { joinStyleClass } from "@libs/client/utils";
import { UserRecordType } from "@libs/server/types";
import useSWR from "swr";

interface props {
  page: number;
  recordUrl: string;
  onNextPage: () => void;
  onPrePage: () => void;
}

const PageNationButtons: NextPage<props> = ({
  page,
  recordUrl,
  onNextPage,
  onPrePage,
}) => {
  const { data: records } = useSWR<UserRecordType>(recordUrl);

  return (
    <div className="space-x-10 text-center text-lg">
      <button
        onClick={onPrePage}
        className={joinStyleClass(
          "inline-block cursor-pointer scale-md hover:text-gray-700",
          page > 1 ? " text-gray-500" : "text-gray-300 pointer-events-none"
        )}
      >
        &#10094;
      </button>
      <button
        onClick={onNextPage}
        className={joinStyleClass(
          "inline-block cursor-pointer scale-md hover:text-gray-700",
          records?.totalPage && page < records.totalPage
            ? " text-gray-500"
            : "text-gray-300 pointer-events-none"
        )}
      >
        &#10095;
      </button>
    </div>
  );
};

export default PageNationButtons;
