import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Layout from "@components/Layout";
import EditPost from "@components/Modals/EditPostModal";
import DeletePost from "@components/Modals/DeletePostModal";
import ProfileIcon from "@components/ProfileIcon";
import PostArticle from "@components/PostArticle";
import useModal from "@libs/client/useModal";
import {
  useDeleteNoticeMutation,
  useGetPostQuery,
} from "@store/services/notice";
import { format } from "date-fns";
import { toast } from "react-toastify";
import PrivateLoader from "@components/PrivateLoader";

interface props {
  id: number;
}

const PostDetail: NextPage<props> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: post } = useGetPostQuery({ id: +id! });
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
    if (!post?.post) return;
    deleteNoticeMutate({ id: post.post.id });
    onHideDeleteModal();
    router.push("/admin");
  }, [post, router, onHideDeleteModal, deleteNoticeMutate]);

  if (!post?.post) {
    return (
      <h2 className="w-screen h-screen flex justify-center items-center text-4xl font-bold">
        Loading...
      </h2>
    );
  }

  const item = post.post;

  return (
    <Layout>
      <PrivateLoader />
      <EditPost
        id={item.id}
        preTitle={item.title}
        preDesc={item.description}
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
            <h2 className="text-purple-500">{item.title}</h2>
            <small className="self-end">
              {`업데이트 시간 : ${format(
                new Date(item.updatedAt),
                "yyyy-MM-dd HH:mm"
              )}`}
            </small>
          </div>
        </header>
        <main className="space-y-3">
          <PostArticle
            header={<ProfileIcon name={item.user.name} role={item.user.role} />}
            main={item.description}
            footer={`작성일 : ${format(
              new Date(item.createdAt),
              "yyyy-MM-dd"
            )}`}
          />
        </main>

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
      </section>
    </Layout>
  );
};

export default PostDetail;
