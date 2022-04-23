import Timer from "@components/Timer";
import Layout from "@components/Layout";
import HeaderRow from "@components/Row/HeaderRow";
import TimerRecordRow from "@components/Row/TimerRecordRow";
import TimeoutConfirmModal from "@components/Modals/TimeoutConfirmModal";
import { timerRecordThead } from "@libs/client/constants";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import useModal from "@libs/client/useModal";
import { toast } from "react-toastify";
import { getDuration } from "@libs/client/utils";
import { useGetStatusQuery } from "@store/services/user";
import { useEndWorkMutation } from "@store/services/workTime";

const Home = () => {
  const { onHideModal } = useModal("confirmTimer");
  const startTime = useAppSelector((state) => state.workTime.startTime);

  const [endWorkMutate, { isError }] = useEndWorkMutation();
  const { refetch } = useGetStatusQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isError) toast.error("초과근무 종료가 실패했습니다.");
  }, [isError]);

  const onConfirmClick = useCallback(() => {
    endWorkMutate({ start: new Date(startTime), end: new Date() });
    onHideModal();
  }, [startTime, endWorkMutate, onHideModal]);

  const duration = getDuration(
    new Date().getTime() - new Date(startTime).getTime()
  );

  return (
    <Layout title="초과근무 관리" canGoBack={false}>
      <div className="crossAlign">
        <TimeoutConfirmModal
          title={"초과근무를 종료 하겠습니까?"}
          message={`누적시간은 ${duration} 입니다.`}
          onConfirm={onConfirmClick}
        />
        <Timer>
          {/* {!!workTime?.times?.length && (
            <ul className="w-[17rem] max-h-96 mx-auto overflow-y-auto divide-y-[1px]">
              <HeaderRow options={timerRecordThead} size="xs" />
              {workTime.times.map((t) => (
                <TimerRecordRow key={t.id} time={t} />
              ))}
            </ul>
          )} */}
        </Timer>
      </div>
    </Layout>
  );
};

export default Home;
