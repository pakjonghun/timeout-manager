import Timer from "@components/Timer";
import Layout from "@components/Layout";
import HeaderRow from "@components/Row/HeaderRow";
import TimerRecordRow from "@components/Row/TimerRecordRow";
import TimeoutConfirmModal from "@components/Modals/TimeoutConfirmModal";
import { useCallback, useEffect, useMemo } from "react";
import { useAppSelector } from "@libs/client/useRedux";
import useModal from "@libs/client/useModal";
import { toast } from "react-toastify";
import { getDuration } from "@libs/client/utils";
import { useGetStatusQuery } from "@store/services/user";
import {
  useEndWorkMutation,
  useGetTimerWorkTimesQuery,
} from "@store/services/timerWorkTime";

const Home = () => {
  const { onHideModal } = useModal("confirmTimer");
  const startTime = useAppSelector((state) => state.workTime.startTime);

  const [endWorkMutate, { isError }] = useEndWorkMutation();
  const { isError: isStatusError, data } = useGetStatusQuery();
  const { data: workTimes } = useGetTimerWorkTimesQuery();
  const timerRecordThead = useAppSelector(
    (state) => state.record.theads.timerThead
  );

  useEffect(() => {
    if (isStatusError) {
      toast.error("사용자 정보를 다시 받아오지 못했습니다.");
    }

    if (data && !data?.success) {
      toast.error("관리자에 의해 초과근무가 삭제되었습니다.");
    }
  }, [data, isStatusError]);

  useEffect(() => {
    if (isError) toast.error("초과근무 종료가 실패했습니다.");
  }, [isError]);

  const onConfirmClick = useCallback(() => {
    if (!startTime) {
      onHideModal();
      toast.error("시작시간이 없습니다.");
      return;
    }
    const [_, end, duration] = getStartEndDuration(startTime.start);
    endWorkMutate({ start: startTime.id, end, duration });
    onHideModal();
  }, [startTime, endWorkMutate, onHideModal]);

  const duration = useMemo(() => {
    if (startTime) {
      return getDuration(
        new Date().getTime() - new Date(startTime.start).getTime()
      );
    }
    return "00";
  }, [startTime]);

  return (
    <Layout title="초과근무 관리" canGoBack={false}>
      <div className="crossAlign">
        <TimeoutConfirmModal
          title={"초과근무를 종료 하겠습니까?"}
          message={`누적시간은 ${duration} 입니다.`}
          onConfirm={onConfirmClick}
        />
        <Timer>
          {!!workTimes?.workTimes && (
            <ul className="w-[17rem] max-h-96 mx-auto overflow-y-auto divide-y-[1px]">
              <HeaderRow thead={timerRecordThead} size="xs" />
              {workTimes.workTimes.map((t) => (
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

function getStartEndDuration(startTime: string): [string, string, number] {
  const start = new Date(startTime);
  const end = new Date();
  const duration = end.getTime() - start.getTime();

  return [start.toString(), end.toString(), duration];
}
