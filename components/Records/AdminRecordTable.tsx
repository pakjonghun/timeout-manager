import { useCallback } from "react";
import HeaderRow from "@components/Row/HeaderRow";
import UserRecordRow from "@components/Row/UserRecordRow";
import AdminNameRecordRow from "@components/Row/AdminNameRecordRow";
import { UserRecordWithUser } from "@libs/server/types";
import { useAppSelector } from "@libs/client/useRedux";
import { useGetRecordsByPageQuery } from "@store/services/record";
import { useDispatch } from "react-redux";
import {
  addItem,
  clearAll,
  removeItem,
  selectAll,
} from "@store/reducer/userRecordReducer";
import {
  clearAll as adminClearAll,
  selectAll as adminSelectAll,
  removeItem as adminRemoveItem,
  addItem as adminAddItem,
} from "@store/reducer/adminRecordReducer";
import useSort from "@libs/client/useSort";
import { useGetMeStatusQuery } from "@store/services/user";

const AdminRecordTable = ({}) => {
  const dispatch = useDispatch();
  const { data: me } = useGetMeStatusQuery("status=1");
  const query = useAppSelector((state) => state.query.recordQuery);
  const userRole = me?.user?.role;
  const { data: records } = useGetRecordsByPageQuery(query);
  const onSort = useSort();
  const onRecord = useCallback(
    (event: React.MouseEvent, data: UserRecordWithUser) => {
      const target = event.target as HTMLElement;
      if (target.id) return;
      // setEditModalData(data);
      // setIsShowEditModal(true);
    },
    []
  );
  const { thead, isAllSelected, selectedIds } = useAppSelector((state) => {
    if (userRole === "USER") return state.userRecord;
    else return state.adminRecord;
  });

  const onSelect = useCallback(
    (event: React.FormEvent<HTMLElement>) => {
      const value = +(event.target as HTMLInputElement).value;
      const isInclude = selectedIds.includes(value);

      switch (userRole) {
        case "USER":
          if (!isInclude) dispatch(addItem(value));
          else dispatch(removeItem(value));
          break;

        default:
          if (!isInclude) dispatch(adminAddItem(value));
          else dispatch(adminRemoveItem(value));
          break;
      }
    },
    [userRole, selectedIds, dispatch]
  );

  const onSelectAll = useCallback(() => {
    if (!records?.records) return;
    const ids = records.records.map((v) => v.id);

    switch (isAllSelected) {
      case true:
        if (userRole === "USER") dispatch(clearAll());
        else dispatch(adminClearAll());
        break;

      default:
        if (userRole === "USER") dispatch(selectAll(ids));
        else dispatch(adminSelectAll(ids));
        break;
    }
  }, [records, userRole, isAllSelected, dispatch]);

  if (!userRole) return null;

  return (
    <ul className="px-5 relative pb-10 divide-y-[1px] mt-2 max-h-[80vh] text-sm rounded-md overflow-y-auto">
      <HeaderRow
        options={thead}
        isSelected={isAllSelected}
        onSort={onSort}
        onSelectAll={onSelectAll}
      />
      {records?.records &&
        records.records.map((v) => {
          console.log(selectedIds, v.id);
          switch (userRole) {
            case "ADMIN":
              return (
                <AdminNameRecordRow
                  data={v}
                  key={v.id}
                  isPickable={true}
                  isSelected={selectedIds.includes(v.id)}
                  onSelect={onSelect}
                  onClick={onRecord}
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
