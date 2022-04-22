import { useCallback, useEffect } from "react";
import { NextPage } from "next";
import TimeLine from "./TimeLine";
import StatusButtons from "./StatusButtons";
import StatusMessages from "./StatusMessages";
import useModal from "@libs/client/useModal";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { startTimer } from "@store/api/timer";
import useTimeController from "./controllers/timeController";
import { useGetRecordByDateQuery } from "@store/services/timer";

interface props {
  children: React.ReactNode;
}

const Timer: NextPage<props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const [hour, minute, second] = useTimeController();
  const { refetch } = useGetRecordByDateQuery("");
  const { onShowModal } = useModal("confirmTimer");
  const timeoutStatus = useAppSelector((state) => state.timer.timeoutStatus);

  useEffect(() => {
    refetch();
  }, [timeoutStatus, refetch]);

  const onClickTimerButton = useCallback(() => {
    if (timeoutStatus === "end")
      return onShowModal(() => console.log("onshowmodal"));
    const now = new Date().toString();
    dispatch(startTimer(now));
  }, [timeoutStatus, dispatch, onShowModal]);

  return (
    <div className="grid grid-rows-[2fr,minmax(6rem,1fr),3fr] place-content-center">
      <StatusButtons onClickTimerButton={onClickTimerButton} />
      <div className="relative -top-20 flex flex-col items-center justify-center self-start">
        <TimeLine hour={hour} minute={minute} second={second} />
        <StatusMessages />
      </div>
      <div className="relative -mt-20">{children}</div>
    </div>
  );
};

export default Timer;
