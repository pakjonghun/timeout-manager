import { useMemo } from "react";
import { NextPage } from "next";
import { UserRecordType } from "@libs/server/types";
import useSWR from "swr";
import { format } from "date-fns";

interface props {
  recordUrl: string;
}

const SubTitle: NextPage<props> = ({ recordUrl }) => {
  const { data: records } = useSWR<UserRecordType>(recordUrl);

  const workingPeopleCount: number = useMemo(() => {
    return (
      records?.records?.reduce(
        (acc: number, cur) => (cur.end === null ? acc + 1 : acc),
        0
      ) || 0
    );
  }, [records]);

  const currentWorkingPeopleCount = useMemo(() => {
    return records?.records && records?.records?.length - workingPeopleCount;
  }, [records, workingPeopleCount]);

  if (!records) return null;

  return (
    <div className="flex flex-col items-end mr-7 font-md text-gray-600">
      <span>{format(new Date(), "yyyy-MM-dd")}</span>
      <span>
        {`근무중 ${workingPeopleCount}건 ∙ 종료 ${currentWorkingPeopleCount}건`}
      </span>
    </div>
  );
};

export default SubTitle;
