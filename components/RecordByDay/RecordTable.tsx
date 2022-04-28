import { useCallback } from "react";
import HeaderRow from "@components/Row/HeaderRow";
import RecordByDay from "@components/Row/RecordByDay";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import useSort from "@libs/client/useSort";
import { useRouter } from "next/router";
import Spin from "@components/Spin";
import { setDates, setStandard } from "@store/reducer/search";
import { useGetRecordsByDayQuery } from "@store/services/search";
import { useGetRecordWorkTimesQuery } from "@store/services/records";
import { toast } from "react-toastify";

const RecordTable = ({}) => {
  const onSortClick = useSort("day");
  const router = useRouter();

  const dispatch = useAppDispatch();
  const theads = useAppSelector((state) => state.record.theads);
  const userRole = useAppSelector((state) => state.user.role);
  const { data: records, isLoading } = useGetRecordsByDayQuery();
  const { refetch } = useGetRecordWorkTimesQuery();

  const onRowClick = useCallback(
    (day: string) => {
      dispatch(setStandard("name"));
      dispatch(setDates(day));
      refetch();
    },
    [refetch, dispatch]
  );

  if (userRole !== "ADMIN") {
    toast.warn("권한이 없습니다.");
    router.push("/");
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin classes="w-28 h-28 fill-gray-200" />
      </div>
    );
  }

  return (
    <ul className="px-5 relative pb-10 divide-y-[1px] mt-2 max-h-[80vh] text-sm rounded-md overflow-y-auto">
      <HeaderRow
        thead={theads.adminByDayThead}
        onSortClick={(event) => onSortClick(event, "day")}
      />
      {records?.records &&
        records.records.map((v) => {
          return <RecordByDay data={v} key={v.day} onClick={onRowClick} />;
        })}
    </ul>
  );
};

export default RecordTable;
