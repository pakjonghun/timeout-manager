import Layout from "@components/Layout";
import TimerRecordRow from "@components/Row/TimerRecordRow";
import { RecordRowHeaderType } from "@libs/client/types/dataTypes";
import gravatar from "gravatar";
import { useCallback, useState } from "react";
import EditProfileModal from "@components/Modals/EditProfileModal";
import HeaderRow from "@components/Row/HeaderRow";
import useSWR from "swr";
import { TimeType } from "@libs/server/types";

const options: RecordRowHeaderType = {
  start: { colSpan: 1 },
  end: { colSpan: 1 },
  duration: { colSpan: 1 },
};

const me = {
  name: "pak",
  role: "ADMIN",
};

const Profile = () => {
  const [showEditProfileModal, setShowAddPostModal] = useState(false);
  const onCloseModal = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    setShowAddPostModal(false);
  }, []);

  const onEditProfile = useCallback(() => {
    setShowAddPostModal(true);
  }, []);

  const { data: times } = useSWR<TimeType>("/api/times");

  return (
    <Layout title="개인정보" canGoBack={false}>
      <EditProfileModal onClose={onCloseModal} isShow={showEditProfileModal} />

      <div className="mt-24 sm:mt-32 lg:mt-40;">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-[1fr,_2fr] mb-10">
            <div className="w-fit p-[0.3rem] border-yellow-500 rounded-full border-4">
              <img
                className="rounded-full"
                src={gravatar.url(me.name, { s: "60", d: "retro" })}
                alt="avatar"
              />
            </div>
            <div className="flex flex-col justify-center pl-10">
              <span className="font-medium text-gray-600">매니저</span>
              <span className="font-md text-gray-400">2022-10-13 보직</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2 font-md text-gray-600">
            <span>이름</span>
            <span>핸드폰</span>
            <span>이메일</span>
          </div>
          <button
            onClick={onEditProfile}
            className="mt-5 font-md py-2 px-5 text-green-100 bg-green-500 roundShadow-md scale-md"
          >
            Edit Profile
          </button>
        </div>
        <ul className="mt-10 divide-y-[1px] max-h-80 overflow-y-auto">
          {!!times?.times?.length && (
            <ul className="w-[17rem] max-h-96 mx-auto overflow-y-auto divide-y-[1px]">
              <HeaderRow options={options} size="xs" />
              {times.times.map((t) => (
                <TimerRecordRow key={t.id} time={t} />
              ))}
            </ul>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default Profile;
