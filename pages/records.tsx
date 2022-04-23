import { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "@components/Layout";
import SubMenu from "@components/Records/SubMenu";
import EditRecordModal from "@components/Modals/EditRecordModal";
import AdminRecordTable from "@components/Records/AdminRecordTable";
import RecordDeleteModal from "@components/Modals/RecordDeleteModal";
import PageNationButtons from "@components/PageNationButtons";
import useSort from "@libs/client/useSort";
import useModal from "@libs/client/useModal";
import useMutation from "@libs/client/useMutation";
import usePagnation from "@libs/client/usePagnation";
import { joinStyleClass } from "@libs/client/utils";
import {
  AdminRecordHeaderType,
  UserRecordHeaderType,
} from "@libs/client/types/dataTypes";
import {
  CommonResType,
  MeType,
  UserRecordType,
  UserRecordWithUser,
} from "@libs/server/types";
import usePage from "@libs/client/usePagnation";
import useSWR from "swr";
import { toast } from "react-toastify";
import { useGetRecordsByPageQuery } from "@store/services/record";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { useGetMeStatusQuery } from "@store/services/user";
import { Role } from "@prisma/client";
import { setQuery } from "@store/reducer/queryReducer";

const Record = () => {
  // const [recordUrl, setRecordUrl] = useState("/api/records?page=1");
  // const [selectList, setSelectList] = useState<string[]>([]);
  // const [isAllSelect, setIsAllSelect] = useState(false);
  // const [editModalData, setEditModalData] = useState<UserRecordWithUser | null>(
  //   null
  // );

  // const { page, onNextPage, onPrePage } = usePagnation(recordUrl);
  // const { curSort, sorts, onSort, setSorts } = useSort(initUserThead, [
  //   "createdAt",
  //   "desc",
  // ]);

  // const [isShowEditModal, onEditModalClose, setIsShowEditModal] = useModal();
  // const [isShowDeleteModal, onDeleteModalClose, setIsShowDeleteModal] =
  //   useModal();

  // const { data: me } = useSWR<MeType>("/api/users/me");
  // const { data: records, mutate: mutateRecords } =
  //   useSWR<UserRecordType>(recordUrl);

  // const [deleteRecords, { isLoading: isDeleted }] = useMutation<CommonResType>({
  //   method: "DELETE",
  //   url: "/api/records",
  // });

  // const [updateRecords] = useMutation<CommonResType>({
  //   method: "PATCH",
  //   url: "/api/records",
  // });

  // useEffect(() => {
  //   const init = me?.user?.role === "ADMIN" ? initAdminThead : initUserThead;
  //   setSorts(init);
  // }, [me]);

  // useEffect(() => {
  //   const url = new URLSearchParams();
  //   url.append("page", page + "");
  //   url.append(curSort[0], curSort[1]);
  //   setRecordUrl(`/api/records?${url.toString()}`);
  // }, [page, curSort]);

  // const onRecord = useCallback(
  //   (event: React.MouseEvent, data: UserRecordWithUser) => {
  //     const target = event.target as HTMLElement;
  //     if (target.id) return;
  //     setEditModalData(data);
  //     setIsShowEditModal(true);
  //   },
  //   [setEditModalData, setIsShowEditModal]
  // );

  // const onSelect = useCallback(
  //   (event: React.FormEvent<HTMLElement>) => {
  //     const value = (event.target as HTMLInputElement).value;
  //     const isInclude = selectList.includes(value);
  //     setSelectList(
  //       isInclude
  //         ? selectList.filter((v) => v !== value)
  //         : [...selectList, value]
  //     );
  //   },
  //   [selectList]
  // );

  // const onSelectAll = useCallback(() => {
  //   if (!records?.records) return;

  //   if (isAllSelect) {
  //     setIsAllSelect(false);
  //     setSelectList([]);
  //   } else {
  //     const ids = records.records.map((v) => v.id + "");
  //     setIsAllSelect(true);
  //     setSelectList(ids);
  //   }
  // }, [records, isAllSelect]);

  // const onConfirmDelete = useCallback(() => {
  //   deleteRecords({ ids: selectList }, () => {
  //     mutateRecords();
  //     setSelectList([]);
  //     setIsShowDeleteModal(false);
  //     setIsAllSelect(false);
  //   });
  // }, [selectList, deleteRecords, mutateRecords, setIsShowDeleteModal]);

  // const onDeleteModalShow = useCallback(() => {
  //   if (!selectList.length) return toast.warn("선택된 항목이 없습니다.");
  //   setIsShowDeleteModal(true);
  // }, [selectList, setIsShowDeleteModal]);
  const dispatch = useAppDispatch();
  const { data: me } = useGetMeStatusQuery("");

  //
  const reducerName =
    me?.user?.role === "ADMIN" ? "adminRecord" : "adminRecord";
  const { page, totalPage, onNextPage, onPreviousPage } = usePage(reducerName);
  const { currentSort, currentPage } = useAppSelector(
    (state) => state[reducerName]
  );

  useEffect(() => {
    const url = new URLSearchParams();
    url.append("page", currentPage + "");

    if (currentSort[0] && currentSort[1]) {
      url.append(currentSort[0], currentSort[1]);
    }

    dispatch(setQuery({ key: "recordQuery", query: `${url.toString()}` }));
  }, [currentSort, currentPage, dispatch]);

  return (
    <Layout title="초과근무 내역" canGoBack={false}>
      <EditRecordModal />

      {/* <RecordDeleteModal
        onClose={onDeleteModalClose}
        showDeleteModal={isShowDeleteModal}
        selectedDataCount={selectList.length}
        onConfirm={onConfirmDelete}
      /> 

      {/* <div
        className={joinStyleClass(
          "grid w-full mt-5",
          userRole === "ADMIN"
            ? "grid-rows-[5vh,67vh,3vh]"
            : "grid-rows-[70vh,3vh]"
        )}
      > */}
      {/* <SubMenu
          isDeleted={isDeleted}
          onDeleteModalShow={onDeleteModalShow}
          recordUrl={recordUrl}
        /> */}

      <AdminRecordTable />

      <PageNationButtons
        page={page}
        totalPage={totalPage}
        onNextPage={onNextPage}
        onPrePage={onPreviousPage}
      />
      {/* </div> */}
    </Layout>
  );
};

export default Record;
