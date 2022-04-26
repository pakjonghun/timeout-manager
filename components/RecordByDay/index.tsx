import { NextPage } from "next";
import { useEffect } from "react";
import { reset as resetSearch } from "@store/reducer/search";
import RecordTable from "@components/RecordByDay/RecordTable";
import PageNationButtons from "@components/PageNationButtons";
import usePage from "@libs/client/usePage";
import { joinStyleClass } from "@libs/client/utils";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { reset } from "@store/reducer/record";

interface props {
  classes?: string;
}

const RecordByDay: NextPage<props> = ({ classes }) => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.user.role);
  const { page, totalPage, onNextPage, onPreviousPage } = usePage("day");

  useEffect(() => {
    return () => {
      dispatch(reset());
      dispatch(resetSearch());
    };
  }, [dispatch]);

  return (
    <div
      className={joinStyleClass(
        classes ? classes : "grid w-full mt-5",
        userRole === "ADMIN" ? "grid-rows-[55vh,3vh]" : "grid-rows-[70vh,3vh]"
      )}
    >
      <RecordTable />
      <PageNationButtons
        page={page}
        totalPage={totalPage}
        onNextPage={onNextPage}
        onPrePage={onPreviousPage}
      />
    </div>
  );
};

export default RecordByDay;
