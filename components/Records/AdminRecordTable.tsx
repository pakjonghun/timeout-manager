import { useCallback } from "react";
import HeaderRow from "@components/Row/HeaderRow";
import UserRecordRow from "@components/Row/UserRecordRow";
import AdminNameRecordRow from "@components/Row/AdminNameRecordRow";
import { useAppDispatch, useAppSelector } from "@libs/client/useRedux";
import { useGetRecordWorkTimesQuery } from "@store/services/workTime";
import {
  addItem,
  clearAll,
  removeItem,
  selectAll,
  sort,
  SortKey,
} from "@store/reducer/record";

const AdminRecordTable = ({}) => {
  const dispatch = useAppDispatch();

  const thead = useAppSelector((state) => state.record.theads.adminThead);
  const selectedIds = useAppSelector((state) => state.record.selectedIds);
  const userRole = useAppSelector((state) => state.user.role);
  const { data: records, isLoading, isError } = useGetRecordWorkTimesQuery();

  const onSortClick = useCallback(
    (event: React.FormEvent<HTMLElement>) => {
      if (!userRole) return;

      const target = event.target as HTMLInputElement;
      if (target.id === "allSelectBoxLabel") return;

      const payload = {
        sortKey: target.value as SortKey,
        userRole,
      };
      dispatch(sort(payload));
    },
    [userRole, dispatch]
  );

  const onSelectAll = useCallback(() => {
    if (!records || !records?.workTimes) return;

    const allLen = records.workTimes.length;

    if (allLen === selectedIds.length) dispatch(clearAll());
    else dispatch(selectAll(selectedIds));
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

  const onRowClick = useCallback((event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.id) return;
    // onShowModal();
    // dispatch(setSelectedData(data));
  }, []);

  if (!records?.workTimes) return null;

  if (isError) return null;

  if (isLoading) return null;

  return (
    <ul className="px-5 relative pb-10 divide-y-[1px] mt-2 max-h-[80vh] text-sm rounded-md overflow-y-auto">
      <HeaderRow
        thead={thead}
        isSelected={selectedIds.length === records?.workTimes?.length}
        onSortClick={onSortClick}
        onSelectAll={onSelectAll}
      />
      {records?.workTimes &&
        records.workTimes.map((v) => {
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

export default AdminRecordTable;
