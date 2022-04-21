import { getCanStartTime } from "@libs/server/utils";
import { format } from "date-fns";
import { useAppSelector } from "@libs/client/useRedux";

const StatusMessages = () => {
  const timeoutStatus = useAppSelector((state) => state.timer.timeoutStatus);
  const startTime = useAppSelector((state) => new Date(state.timer.startTime));
  const canStartTime = getCanStartTime();

  if (!startTime) return null;
  const canStart = startTime.getTime() < canStartTime.getTime();

  return (
    <>
      {timeoutStatus === "start" && canStart && (
        <h2 className="text-gray-600">아직 초과근무를 시작 할 수 없습니다.</h2>
      )}

      {timeoutStatus === "end" && (
        <h2 className="text-gray-600">
          초과근무가 {format(startTime, "HH:mm")}에 시작되었습니다.
        </h2>
      )}
    </>
  );
};

export default StatusMessages;
