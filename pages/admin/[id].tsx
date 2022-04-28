import Layout from "@components/Layout";
import { Posts, Role } from "@prisma/client";
import ProfileIcon from "@components/ProfileIcon";
import PostArticle from "@components/PostArticle";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import client from "@libs/server/client";
import { useRouter } from "next/router";
import { format } from "date-fns";
import useModal from "@libs/client/useModal";
import { useCallback, useEffect } from "react";
import { useGetMeQuery } from "@store/services/user";
import EditPost from "@components/Modals/EditPostModal";
import DeletePost from "@components/Modals/DeletePostModal";
import { useDeleteNoticeMutation } from "@store/services/notice";
import { toast } from "react-toastify";


interface WithUserPost extends Posts {
  user: {
    role: Role;
    name: string;
  };
}

interface props {
  post: WithUserPost;
}

const PostDetail: NextPage<props> = ({ post }) => {
  const router = useRouter();

  const { isShowModal, onHideModal, onShowModal } = useModal("postEdit");
  const { onHideModal: onHideDeleteModal, onShowModal: onShowDeleteModal } =
    useModal("postDelete");

  const [deleteNoticeMutate, { isError }] = useDeleteNoticeMutation();

  useEffect(() => {
    if (isError) toast.error("공지글 삭제가 실패했습니다.");
  }, [isError]);

  const onConfirmEdit = useCallback(() => {
    onHideModal();
  }, [onHideModal]);

  const confirmDelete = useCallback(() => {
    deleteNoticeMutate({ id: post.id });
    onHideDeleteModal();
    router.push("/notices");
  }, [post, router, onHideDeleteModal, deleteNoticeMutate]);

  const { data: me } = useGetMeQuery();

  if (router.isFallback) {
    return (
      <h1 className="w-screen h-screen flex justify-center items-center text-4xl font-bold">
        Loading...
      </h1>
    );
  }

  return (
    <Layout>
      <EditPost
        id={post.id}
        preTitle={post.title}
        preDesc={post.description}
        onClose={onHideModal}
        onConfirm={onConfirmEdit}
        isShow={isShowModal}
      />
      <DeletePost
        title="정말 삭제 하시겠습니까?"
        message="삭제 후 되돌릴 수 없습니다."
        onConfirm={confirmDelete}
      />
      <section className="w-[90%] lg:w-[95%] p-3 space-y-5 bg-purple-100 roundShadow-md">
        <header>
          <div className="flex items-center justify-between px-2 font-md text-gray-500">
            <h2 className="text-purple-500">{post.title}</h2>
            <small className="self-end">
              {`업데이트 시간 : ${format(
                new Date(post.updatedAt),
                "yyyy-MM-dd HH:mm"
              )}`}
            </small>
          </div>
        </header>
        <main className="space-y-3">
          <PostArticle
            header={<ProfileIcon name={post.user.name} role={post.user.role} />}
            main={post.description}
            footer={`작성일 : ${format(
              new Date(post.createdAt),
              "yyyy-MM-dd"
            )}`}
          />
        </main>
        {me?.user?.role === "ADMIN" && (
          <div className="flex justify-end mt-5">
            <>
              <button
                onClick={() => onShowModal()}
                className="py-2 px-5 self-end mr-8 bg-green-500 text-green-100 roundShadow-md transition scale font-md text-sm"
              >
                편집하기
              </button>
              <button
                onClick={() => onShowDeleteModal()}
                className="py-2 px-5 self-end mr-8 bg-green-500 text-green-100 roundShadow-md transition scale font-md text-sm"
              >
                삭제하기
              </button>
            </>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default PostDetail;

export const getStaticProps: GetStaticProps = async (ctx) => {
  let post: any;

  const id = ctx.params?.id;

  if (id) {
    post = await client.posts.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: {
          select: {
            role: true,
            name: true,
          },
        },
      },
    });
  } else post = {};

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
