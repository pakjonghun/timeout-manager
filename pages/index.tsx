import Timer from "@components/Timer";
import Layout from "@components/Layout";
import HeaderRow from "@components/Row/HeaderRow";
import TimerRecordRow from "@components/Row/TimerRecordRow";
import TimeoutConfirmModal from "@components/Modals/TimeoutConfirmModal";
import { useGetRecordByDateQuery } from "@store/services/timer";
import { timerRecordThead } from "@libs/client/constants";
import { useCallback } from "react";
import { useAppDispatch } from "@libs/client/useRedux";
import useModal from "@libs/client/useModal";
import { endTimer } from "@store/api/timer";
import { toast } from "react-toastify";
import { getDuration } from "@libs/client/utils";

const Home = () => {
  const dispatch = useAppDispatch();
  const { onHideModal } = useModal("confirmTimer");

  const { data: workTime } = useGetRecordByDateQuery("");
  const startTimeDate = workTime?.times?.[0].start;

  const onConfirmClick = useCallback(() => {
    if (!startTimeDate) return toast.warn("시작 데이터가 없습니다.");
    dispatch(
      endTimer({
        startTime: startTimeDate.toString(),
        endTime: new Date().toString(),
      })
    );
    onHideModal();
  }, [startTimeDate, onHideModal, dispatch]);

  if (!startTimeDate) {
    return null;
  }

  const startTime = new Date(startTimeDate.toString()).getTime();
  const duration = getDuration(new Date().getTime() - startTime);

  return (
    <Layout title="초과근무 관리" canGoBack={false}>
      <div className="crossAlign">
        <TimeoutConfirmModal
          title={"초과근무를 종료 하겠습니까?"}
          message={`누적시간은 ${duration} 입니다.`}
          onConfirm={onConfirmClick}
        />
        <Timer>
          {!!workTime?.times?.length && (
            <ul className="w-[17rem] max-h-96 mx-auto overflow-y-auto divide-y-[1px]">
              <HeaderRow options={timerRecordThead} size="xs" />
              {workTime.times.map((t) => (
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
