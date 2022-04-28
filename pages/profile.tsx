import { useCallback } from "react";
import Layout from "@components/Layout";
import PrivateLoader from "@components/PrivateLoader";
import EditProfileModal from "@components/Modals/EditProfileModal";
import useModal from "@libs/client/useModal";
import { useAppSelector } from "@libs/client/useRedux";
import { useGetMeQuery } from "@store/services/user";
import { format } from "date-fns";

const Profile = () => {
  const { data: me } = useGetMeQuery("");
  const avatar = useAppSelector((state) => state.user.avatar);
  const { isShowModal, onHideModal, onShowModal } = useModal("editProfile");

  const onEditProfile = useCallback(() => {
    onShowModal();
  }, [onShowModal]);

  return (
    <Layout title="개인정보" canGoBack={false}>
      <PrivateLoader />
      <EditProfileModal onClose={onHideModal} isShow={isShowModal} />

      <div className="mt-24 sm:mt-32 lg:mt-40;">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-[1fr,_2fr] mb-10">
            <div className="w-fit p-[0.3rem] border-yellow-500 rounded-full border-4">
              <img
                className="w-16 h-16 rounded-full"
                src={avatar}
                alt="avatar"
              />
            </div>
            <div className="flex flex-col justify-center pl-10">
              <span className="font-medium text-gray-600">{}</span>
              {me?.user?.createdAt && (
                <span className="font-md text-gray-400">
                  {format(new Date(me?.user?.createdAt), "yyyy-MM-dd")}보직
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2 font-md text-gray-600">
            {me?.user?.name && <span>{me.user.name}</span>}
            {me?.user?.phone && <span>{me.user.phone}</span>}
            {me?.user?.email && <span>{me.user.email}</span>}
          </div>
          <button
            onClick={onEditProfile}
            className="mt-5 font-md py-2 px-5 text-green-100 bg-green-500 roundShadow-md scale-md"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
