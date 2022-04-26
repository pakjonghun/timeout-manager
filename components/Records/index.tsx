import { useCallback, useEffect } from "react";
import SubMenu from "@components/Records/SubMenu";
import EditRecordModal from "@components/Modals/EditRecordModal";
import RecordTable from "@components/Records/RecordTable";
import RecordDeleteModal from "@components/Modals/RecordDeleteModal";
import PageNationButtons from "@components/PageNationButtons";
import useModal from "@libs/client/useModal";
import usePage from "@libs/client/usePage";
import { joinStyleClass } from "@libs/client/utils";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { useDeleteRecordMutation } from "@store/services/records";
import { toast } from "react-toastify";
import { reset } from "@store/reducer/record";
import { NextPage } from "next";

interface props {
  isSubMenuShow?: boolean;
  classes?: string;
}

const Record: NextPage<props> = ({ isSubMenuShow = true, classes }) => {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => state.record.selectedIds);
  const userRole = useAppSelector((state) => state.user.role);
  const { isShowModal, onShowModal, onHideModal } = useModal("recordDelete");
  const { page, totalPage, onNextPage, onPreviousPage } = usePage();
  const [deleteRecordMutation, { isLoading, isError }] =
    useDeleteRecordMutation();

  useEffect(() => {
    if (isError) toast.error("기록 삭제가 실패했습니다.");
  }, [isError]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const onDeleteModalShow = useCallback(() => {
    if (!selectedIds.length) return toast.warn("선택된 항목이 없습니다.");
    onShowModal();
  }, [selectedIds, onShowModal]);

  const onConfirmDelete = useCallback(() => {
    deleteRecordMutation({ ids: selectedIds });
    onHideModal();
  }, [selectedIds, deleteRecordMutation, onHideModal]);

  return (
    <div
      className={joinStyleClass(
        classes ? classes : "grid w-full mt-5",
        userRole === "ADMIN"
          ? "grid-rows-[5vh,67vh,3vh]"
          : "grid-rows-[70vh,3vh]"
      )}
    >
      {isSubMenuShow && (
        <SubMenu isDeleted={isLoading} onDeleteModalShow={onDeleteModalShow} />
      )}
      <RecordTable />
      <PageNationButtons
        page={page}
        totalPage={totalPage}
        onNextPage={onNextPage}
        onPrePage={onPreviousPage}
      />
      <EditRecordModal />
      <RecordDeleteModal
        isShow={isShowModal}
        onClose={onHideModal}
        onConfirm={onConfirmDelete}
        selectedDataCount={selectedIds.length}
      />
    </div>
  );
};

export default Record;
