import { useCallback } from "react";
import HeaderRow from "@components/Row/HeaderRow";
import UserRecordRow from "@components/Row/UserRecordRow";
import AdminNameRecordRow from "@components/Row/AdminNameRecordRow";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { useGetRecordWorkTimesQuery } from "@store/services/records";
import {
  addItem,
  clearAll,
  removeItem,
  selectAll,
  setSelectedData,
} from "@store/reducer/record";
import useSort from "@libs/client/useSort";
import useModal from "@libs/client/useModal";
import { WithUserRecord } from "@libs/server/types/dataTypes";
import Spin from "@components/Spin";

const RecordTable = ({}) => {
  const dispatch = useAppDispatch();

  const theads = useAppSelector((state) => state.record.theads);
  const selectedIds = useAppSelector((state) => state.record.selectedIds);
  const userRole = useAppSelector((state) => state.user.role);
  const { data: records, isLoading, isError } = useGetRecordWorkTimesQuery();

  const onSortClick = useSort();

  const onSelectAll = useCallback(() => {
    if (!records || !records?.records) return;
    const allLen = records.records.length;
    const allIds = records.records.map((r) => r.id);
    if (allLen === selectedIds.length) dispatch(clearAll());
    else dispatch(selectAll(allIds));
  }, [selectedIds, records, dispatch]);

  const onSelect = useCallback(
    (event: React.FormEvent<HTMLElement>) => {
      const value = +(event.target as HTMLInputElement).value;
      const isInclude = selectedIds.includes(value);

      if (!isInclude) dispatch(addItem(value));
      else dispatch(removeItem(value));
    },
    [selectedIds, dispatch]
  );

  const { onShowModal } = useModal("recordEdit");

  const onRowClick = useCallback(
    (event: React.MouseEvent, data: WithUserRecord) => {
      const recordList = records?.records;
      if (!records || !recordList) return;

      const target = event.target as HTMLElement;
      if (target.id) return;

      onShowModal();

      const newData = {
        ...data,
        ...(data.end ? { end: data.end.toString() } : { end: null }),
        ...(data.duration ? { duration: +data.duration } : { duration: null }),
        start: data.start.toString(),
      };

      dispatch(setSelectedData(newData));
    },
    [records, onShowModal, dispatch]
  );

  if (!records?.records) return null;

  if (isError) return null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin classes="w-28 h-28 fill-gray-200" />
      </div>
    );
  }

  return (
    <ul className="px-5 relative pb-10 divide-y-[1px] mt-2 max-h-[80vh] text-sm rounded-md overflow-y-auto">
      <HeaderRow
        thead={userRole === "ADMIN" ? theads.adminThead : theads.userThead}
        isSelected={selectedIds.length === records?.records?.length}
        onSortClick={onSortClick}
        onSelectAll={onSelectAll}
      />
      {records?.records &&
        records.records.map((v) => {
          switch (userRole) {
            case "ADMIN":
              return (
                <AdminNameRecordRow
                  data={v}
                  key={v.id}
                  isPickable={true}
                  isSelected={selectedIds.includes(v.id)}
                  onSelect={onSelect}
                  onClick={onRowClick}
                />
              );

            case "USER":
              return <UserRecordRow key={v.id} data={v} />;

            default:
              return null;
          }
        })}
    </ul>
  );
};

export default RecordTable;
