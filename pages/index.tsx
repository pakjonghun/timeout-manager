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
