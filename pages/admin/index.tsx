import { useCallback } from "react";
import AddPostModal from "@components/Modals/AddPostModal";
import Layout from "@components/Layout";
import HeaderRow from "@components/Row/HeaderRow";
import PostRow from "@components/Row/PostRow";
import useModal from "@libs/client/useModal";
import client from "@libs/server/client";
import { Posts, Role, Users } from "@prisma/client";
import { GetServerSideProps, NextPage, NextPageContext } from "next";
import { useGetMeQuery } from "@store/services/user";
import { postThead } from "@libs/client/constants";
import { withSSRCookie } from "@libs/server/withCookie";

interface IWithUserPosts extends Posts {
  user: Pick<Users, "name">;
}

interface props {
  posts: IWithUserPosts[];
  role: Role;
}

const Post: NextPage<props> = ({ posts, role }) => {
  const { isShowModal, onHideModal, onShowModal } = useModal("postAdd");

  const onConfirm = useCallback(() => {
    onHideModal();
  }, [onHideModal]);

  return (
    <Layout title="공지 게시판" canGoBack={false}>
      <AddPostModal
        onConfirm={onConfirm}
        onClose={onHideModal}
        isShow={isShowModal}
      />

      <div className="flex flex-col w-full">
        <ul className="px-5 relative pb-10 divide-y-[1px] mt-5 max-h-[60vh] overflow-y-auto text-sm rounded-md">
          <HeaderRow thead={postThead} size="md" />
          {posts.map((post, index) => {
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

export const getServerSideProps: GetServerSideProps = withSSRCookie(
  async ({ req }: NextPageContext) => {
    const role = req?.session.user?.role;

    const posts = await client.posts.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        role,
      },
    };
  }
);
