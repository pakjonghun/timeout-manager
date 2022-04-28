import { useCallback } from "react";
import Layout from "@components/Layout";
import PostRow from "@components/Row/PostRow";
import HeaderRow from "@components/Row/HeaderRow";
import AddPostModal from "@components/Modals/AddPostModal";
import client from "@libs/server/client";
import useModal from "@libs/client/useModal";
import { postThead } from "@libs/client/constants";
import { GetStaticProps, NextPage } from "next";
import { Posts, Users } from "@prisma/client";

interface IWithUserPosts extends Posts {
  user: Pick<Users, "name">;
}

interface props {
  posts: IWithUserPosts[];
}

const Post: NextPage<props> = ({ posts }) => {
  const { isShowModal, onHideModal } = useModal("postAdd");

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
      </div>
    </Layout>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async () => {
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
    },
    revalidate: 60 * 60 * 24,
  };
};
