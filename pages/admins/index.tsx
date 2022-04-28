import { useCallback } from "react";
import { NextPage } from "next";
import AddPostModal from "@components/Modals/AddPostModal";
import Layout from "@components/Layout";
import HeaderRow from "@components/Row/HeaderRow";
import PostRow from "@components/Row/PostRow";
import useModal from "@libs/client/useModal";
import { postThead } from "@libs/client/constants";
import { Posts, Role, Users } from "@prisma/client";
import { useGetAllPostsQuery } from "@store/services/notice";
import { useAppSelector } from "@libs/client/useRedux";
import PrivateLoader from "@components/PrivateLoader";

interface IWithUserPosts extends Posts {
  user: Pick<Users, "name">;
}

interface props {
  posts: IWithUserPosts[];
  role: Role;
}

const Post: NextPage<props> = () => {
  const { data: posts } = useGetAllPostsQuery();
  const { isShowModal, onHideModal, onShowModal } = useModal("postAdd");
  const role = useAppSelector((state) => state.user.role);

  const onConfirm = useCallback(() => {
    onHideModal();
  }, [onHideModal]);

  return (
    <Layout title="공지 게시판" canGoBack={false}>
      <PrivateLoader />
      <AddPostModal
        onConfirm={onConfirm}
        onClose={onHideModal}
        isShow={isShowModal}
      />

      <div className="flex flex-col w-full">
        <ul className="px-5 relative pb-10 divide-y-[1px] mt-5 max-h-[60vh] overflow-y-auto text-sm rounded-md">
          <HeaderRow thead={postThead} size="md" />
          {posts?.posts &&
            posts.posts.map((post, index) => {
              return (
                <PostRow
                  key={post.id}
                  data={post}
                  index={index}
                  isPickable={true}
                />
              );
            })}
        </ul>
        <div className="flex justify-end mt-5">
          {role === "ADMIN" && (
            <button
              onClick={() => onShowModal()}
              className="py-2 px-5 self-end mr-8 bg-green-500 text-green-100 roundShadow-md transition scale font-md text-sm"
            >
              글쓰기
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Post;
