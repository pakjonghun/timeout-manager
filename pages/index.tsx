import { useCallback, useEffect, useMemo, useState } from "react";
import Timer from "@components/Timer";
import Layout from "@components/Layout";
import HeaderRow from "@components/Row/HeaderRow";
import TimerRecordRow from "@components/Row/TimerRecordRow";
import TimeoutConfirmModal from "@components/Modals/TimeoutConfirmModal";
import useModal from "@libs/client/useModal";
import { MeType } from "@libs/server/types";
import useMutation from "@libs/client/useMutation";
import { TimeType } from "@libs/server/types";
import { TimeoutStatusType } from "@libs/client/types";
import { RecordRowHeaderType } from "@libs/client/types/dataTypes";
import { getDatePosition, getHourMinuteSecond } from "@libs/client/utils";
import { useGetRecordByDateQuery } from "@store/services/timer";
import { timerRecordThead } from "@libs/client/constants";
import { useAppSelector } from "@libs/client/useRedux";

const Home = () => {
  // const { data: me, mutate: meMutate } = useSWR<MeType>("/api/users/me");
  // const [timeoutStatus, setTimeoutStatus] =
  //   useState<TimeoutStatusType>("start");
  // const [showMessageModal, onClose, setShowMessageModal] = useModal();
  // const [isStatusChanging, setIsStatusChanging] = useState(false);

  // const [hour, setHour] = useState(0);
  // const [minute, setMinute] = useState(0);
  // const [second, setSecond] = useState(0);

  // const [mutation] = useMutation({ url: "/api/times" });
  // const { data: times, mutate } = useSWR<TimeType>("/api/times");

  // useEffect(() => {
  //   if (me?.user?.status === "WORKING" && timeoutStatus === "start") {
  //     if (times?.times?.[0].end === null) {
  //       const start = new Date(times?.times?.[0].start);
  //       const duration = new Date().getTime() - start.getTime();
  //       const [hour, minute, second] = getHourMinuteSecond(duration);

  //       setHour(+hour);
  //       setMinute(+minute);
  //       setSecond(+second);
  //       setTimeoutStatus("end");
  //     }
  //   }
  // }, [me]);

  // const reset = useCallback(() => {
  //   setHour(0);
  //   setMinute(0);
  //   setSecond(0);
  //   setShowMessageModal(false);
  //   setTimeoutStatus("start");
  // }, [setShowMessageModal]);

  // const onConfirm = useCallback(() => {
  //   const start = times?.times?.[0].start;
  //   if (!start) return;

  //   const end = new Date(
  //     new Date(start).getTime() +
  //       hour * 1000 * 60 * 60 +
  //       minute * 1000 * 60 +
  //       second * 1000
  //   );

  //   mutation({ start, end }, () => {
  //     meMutate();
  //     mutate();
  //     reset();
  //   });
  // }, [times, hour, minute, second, reset, mutation, mutate, meMutate]);

  // const onClickTimerButton = useCallback(() => {
  //   if (isStatusChanging) return;
  //   if (timeoutStatus === "end") return setShowMessageModal(true);
  //   if (timeoutStatus === "start" && me?.user?.status === "WORKING") return;

  //   const start = new Date();
  //   mutation({ start }, () => {
  //     mutate();
  //     meMutate();
  //     setTimeoutStatus("end");
  //     setIsStatusChanging(true);
  //   });
  // }, [
  //   me,
  //   isStatusChanging,
  //   timeoutStatus,
  //   mutate,
  //   setShowMessageModal,
  //   mutation,
  //   meMutate,
  // ]);

  const userStatus = useAppSelector((state) => state.user.status);
  const { data } = useGetRecordByDateQuery("");

  return (
    <Layout title="초과근무 관리" canGoBack={false}>
      <div className="crossAlign">
        <TimeoutConfirmModal />
        <Timer>
          {!!data?.times?.length && (
            <ul className="w-[17rem] max-h-96 mx-auto overflow-y-auto divide-y-[1px]">
              <HeaderRow options={timerRecordThead} size="xs" />
              {data.times.map((t) => (
                <TimerRecordRow key={t.id} time={t} />
              ))}
            </ul>
          )}
        </Timer>
      </div>
    </Layout>
  );
};

export default Home;
