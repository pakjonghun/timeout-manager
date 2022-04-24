import { memo } from "react";
import { getCanStartTime } from "@libs/server/utils";
import { useAppSelector } from "@libs/client/useRedux";
import { format } from "date-fns";

const StatusMessages = () => {
  const timeoutStatus = useAppSelector((state) => state.workTime.timerStatus);
  const startTime = useAppSelector((state) => state.workTime.startTime?.start);
  const canStartTime = getCanStartTime();

  if (!startTime) return null;

  const startDate = new Date(startTime);
  const canStart = startDate.getTime() < canStartTime.getTime();

  return (
    <>
      {timeoutStatus === "start" && canStart && (
        <h2 className="text-gray-600">아직 초과근무를 시작 할 수 없습니다.</h2>
      )}

      {timeoutStatus === "end" && (
        <h2 className="my-3 text-gray-600">
          초과근무가 {format(startDate, "HH:mm")}에 시작되었습니다.
        </h2>
      )}
    </>
  );
};

export default memo(StatusMessages);
