import { useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import TimeLine from "./TimeLine";
import StatusButtons from "./StatusButtons";
import StatusMessages from "./StatusMessages";
import useModal from "@libs/client/useModal";
import { getHourMinuteSecond } from "@libs/client/utils";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { startTimer } from "@store/api/timer";
import { useGetMeStatusQuery } from "@store/services/user";
import { useGetRecordByDateQuery } from "@store/services/timer";
import { setStartTime, setTimerStatus } from "@store/reducer/timerReducer";

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

  const { onShowModal } = useModal("confirmTimer");
  const { refetch } = useGetRecordByDateQuery("");
  const { data: myStatus } = useGetMeStatusQuery("status=1");
  const { data: workTime } = useGetRecordByDateQuery("");
  const timeoutStatus = useAppSelector((state) => state.timer.timeoutStatus);

  const onClickTimerButton = useCallback(() => {
    if (timeoutStatus === "end") return onShowModal();
    const now = new Date().toString();
    dispatch(startTimer(now));
    refetch();
  }, [timeoutStatus, dispatch, onShowModal, refetch]);

  useEffect(() => {
    if (myStatus?.user?.status === "WORKING") {
      if (!workTime?.times?.[0].start) return;
      dispatch(setStartTime(workTime.times[0].start.toString()));
      dispatch(setTimerStatus("end"));
      const duration =
        new Date().getTime() -
        new Date(workTime.times[0].start.toString()).getTime();
      const [h, m, s] = getHourMinuteSecond(duration);
      setHour(+h);
      setMinute(+m);
      setSecond(+s);
    }
  }, [myStatus]);

  useEffect(() => {
    if (timeoutStatus === "start") {
      setHour(0);
      setMinute(0);
      setSecond(0);
    }
  }, [timeoutStatus]);

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
