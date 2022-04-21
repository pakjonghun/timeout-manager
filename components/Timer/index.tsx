import { useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import TimeLine from "./TimeLine";
import StatusButtons from "./StatusButtons";
import StatusMessages from "./StatusMessages";
import useModal from "@libs/client/useModal";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { startTimer } from "@store/api/timer";
import { useGetRecordByDateQuery } from "@store/services/timer";

interface props {
  children: React.ReactNode;
}

const Timer: NextPage<props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const interval = useRef<NodeJS.Timer[]>([]);
  const [hourTrigger, setHourTrigger] = useState(0);
  const [minuteTrigger, setMinuteTrigger] = useState(0);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const timeoutStatus = useAppSelector((state) => state.timer.timeoutStatus);
  const { onShowModal } = useModal("confirmTimer");
  const { refetch } = useGetRecordByDateQuery("");

  const onClickTimerButton = useCallback(() => {
    if (timeoutStatus === "end") return onShowModal();
    const now = new Date().toString();
    dispatch(startTimer(now));
    refetch();
  }, [timeoutStatus, dispatch, onShowModal, refetch]);

  useEffect(() => {
    if (timeoutStatus === "end") {
      const timer = setInterval(() => {
        setSecond((pre) => {
          if (pre < 59) {
            return pre + 1;
          } else {
            setMinuteTrigger((pre) => pre + 1);
            return 0;
          }
        });
      }, 1000);

      interval.current.push(timer);
    }

    const current = interval.current;
    return () =>
      current.forEach((timer) => {
        console.log(timer);
        clearInterval(timer);
      });
  }, [timeoutStatus, setSecond]);

  useEffect(() => {
    if (minuteTrigger) {
      setMinute((pre) => {
        if (pre < 59) {
          return pre + 1;
        } else {
          setHourTrigger((pre) => pre + 1);
          return 0;
        }
      });
    }
  }, [minuteTrigger, setMinute]);

  useEffect(() => {
    if (hourTrigger) {
      setHour((pre) => pre + 1);
    }
  }, [hourTrigger, setHour]);

  return (
    <div className="grid auto-rows-min place-content-center gap-5">
      <StatusButtons onClickTimerButton={onClickTimerButton} />
      <div className="flex flex-col items-center justify-center self-start">
        <TimeLine hour={hour} minute={minute} second={second} />
        <StatusMessages />
      </div>
      <div className="row-span-2">{children}</div>
    </div>
  );
};

export default Timer;
