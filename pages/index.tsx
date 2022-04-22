import Timer from "@components/Timer";
import Layout from "@components/Layout";
import HeaderRow from "@components/Row/HeaderRow";
import TimerRecordRow from "@components/Row/TimerRecordRow";
import TimeoutConfirmModal from "@components/Modals/TimeoutConfirmModal";
import { useGetRecordByDateQuery } from "@store/services/timer";
import { timerRecordThead } from "@libs/client/constants";

const Home = () => {
  const { data: workTime } = useGetRecordByDateQuery("");

  return (
    <Layout title="초과근무 관리" canGoBack={false}>
      <div className="crossAlign">
        <TimeoutConfirmModal />
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
