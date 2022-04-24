import { useCallback, useEffect } from "react";
import { NextPage } from "next";
import TimeLine from "./TimeLine";
import StatusButtons from "./StatusButtons";
import StatusMessages from "./StatusMessages";
import useModal from "@libs/client/useModal";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import useTimeController from "./controllers/timeController";
import { setStartTime, startTimer } from "@store/reducer/workTime";
import { useStartWorkMutation } from "@store/services/workTime";
import { toast } from "react-toastify";

interface props {
  children: React.ReactNode;
}

const Timer: NextPage<props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const [hour, minute, second] = useTimeController();

  const { onShowModal } = useModal("confirmTimer");
  const timeoutStatus = useAppSelector((state) => state.workTime.timerStatus);
  const [startWorkMutation, { isError, data }] = useStartWorkMutation();

  useEffect(() => {
    if (isError) toast.error("초과근무 시작을 실패했습니다..");
    if (data && !data.success) toast.error("초과근무 시작을 실패했습니다..");
  }, [isError, data, dispatch]);

  const onClickTimerButton = useCallback(() => {
    if (timeoutStatus === "end") return onShowModal();
    startWorkMutation({ start: new Date() });
  }, [timeoutStatus, startWorkMutation, onShowModal]);

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
