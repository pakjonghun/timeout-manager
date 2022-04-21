import { useCallback, useState } from "react";
import AddPostModal from "@components/Modals/AddPostModal";
import Layout from "@components/Layout";
import HeaderRow from "@components/Row/HeaderRow";
import PostRow from "@components/Row/PostRow";
import {
  PostListRowType,
  PostListHeaderRowType,
} from "@libs/client/types/dataTypes";

const record: PostListRowType = {
  id: 12,
  no: 1,
  updatedAt: new Date(),
  title: "Test",
  user: "pak",
  ment: 5,
  isAnswered: true,
};

const record2: PostListRowType = {
  id: 13,
  no: 2,
  updatedAt: new Date(),
  title: "Test",
  user: "pak",
  ment: 5,
  isAnswered: false,
};

const options: PostListHeaderRowType = {
  no: { isSort: true, colSpan: 1 },
  title: { isSort: true, colSpan: 3 },
  updatedAt: { isSort: true, colSpan: 2 },
  user: { isSort: true, colSpan: 2 },
  ment: { isSort: true, colSpan: 1 },
};

const Post = () => {
  //글쓰기 버튼은 관리자만 볼수 있게 할 것

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const onCloseModal = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    setShowAddPostModal(false);
  }, []);

  const onAddPost = useCallback(() => {
    setShowAddPostModal(true);
  }, []);

  return (
    <Layout title="질문 게시판" canGoBack={false}>
      <AddPostModal onClose={onCloseModal} isShow={showAddPostModal} />
      <div className="flex flex-col w-full">
        <ul className="px-5 relative pb-10 divide-y-[1px] mt-5 max-h-[80vh] overflow-y-auto text-sm rounded-md">
          <HeaderRow options={options} size="md" />
          <PostRow data={record} isPickable={true} />
          <PostRow data={record2} isPickable={true} />
        </ul>
        <button
          onClick={onAddPost}
          className="py-2 px-5 self-end mr-5 bg-green-500 text-green-100 roundShadow-md transition scale font-md text-sm"
        >
          글쓰기
        </button>
      </div>
    </Layout>
  );
};

export default Post;
