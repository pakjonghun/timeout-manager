import { useCallback, useEffect } from "react";
import Layout from "@components/Layout";
import SubMenu from "@components/Records/SubMenu";
import EditRecordModal from "@components/Modals/EditRecordModal";
import RecordTable from "@components/Records/RecordTable";
import RecordDeleteModal from "@components/Modals/RecordDeleteModal";
import PageNationButtons from "@components/PageNationButtons";
import useModal from "@libs/client/useModal";
import usePage from "@libs/client/usePage";
import { joinStyleClass } from "@libs/client/utils";
import { useAppSelector } from "@libs/client/useRedux";
import { useDeleteRecordMutation } from "@store/services/records";
import { toast } from "react-toastify";

const Record = () => {
  const selectedIds = useAppSelector((state) => state.record.selectedIds);
  const userRole = useAppSelector((state) => state.user.role);
  const { onShowModal, onHideModal: onHide } = useModal("recordDelete");
  const { isShowModal: isShow, onHideModal } = useModal("recordDelete");
  const { page, totalPage, onNextPage, onPreviousPage } = usePage();
  const [deleteRecordMutation, { isLoading, isError }] =
    useDeleteRecordMutation();

  useEffect(() => {
    if (isError) toast.error("기록 삭제가 실패했습니다.");
  }, [isError]);

  const onDeleteModalShow = useCallback(() => {
    if (!selectedIds.length) return toast.warn("선택된 항목이 없습니다.");
    onShowModal();
  }, [selectedIds, onShowModal]);

  const onConfirmDelete = useCallback(() => {
    deleteRecordMutation({ ids: selectedIds });
    onHide();
  }, [selectedIds, deleteRecordMutation, onHide]);

  return (
    <Layout
      title={userRole === "ADMIN" ? "오늘 초과근무 현황" : "초과근무 내역"}
      canGoBack={false}
    >
      <div
        className={joinStyleClass(
          "grid w-full mt-5",
          userRole === "ADMIN"
            ? "grid-rows-[5vh,67vh,3vh]"
            : "grid-rows-[70vh,3vh]"
        )}
      >
        <SubMenu isDeleted={isLoading} onDeleteModalShow={onDeleteModalShow} />
        <RecordTable />
        <PageNationButtons
          page={page}
          totalPage={totalPage}
          onNextPage={onNextPage}
          onPrePage={onPreviousPage}
        />
        <EditRecordModal />
        <RecordDeleteModal
          onClose={onHideModal}
          isShow={isShow}
          selectedDataCount={selectedIds.length}
          onConfirm={onConfirmDelete}
        />
      </div>
    </Layout>
  );
};

export default Record;
