import { FormEvent } from "react";
import { NextPage } from "next";
import HeaderRow from "@components/Row/HeaderRow";
import UserRecordRow from "@components/Row/UserRecordRow";
import AdminNameRecordRow from "@components/Row/AdminNameRecordRow";
import { UserRecordHeaderType } from "@libs/client/types/dataTypes";
import { MeType, UserRecordType, UserRecordWithUser } from "@libs/server/types";
import useSWR from "swr";

interface props {
  recordUrl: string;
  sorts: UserRecordHeaderType;
  isAllSelect: boolean;
  selectList: string[];
  onSelectAll: () => void;
  onSort: (event: FormEvent<HTMLElement>) => void;
  onRecord: (event: React.MouseEvent, data: UserRecordWithUser) => void;
  onSelect: (event: React.FormEvent<HTMLElement>) => void;
}

const AdminRecordTable: NextPage<props> = ({
  recordUrl,
  sorts,
  isAllSelect,
  selectList,
  onSort,
  onSelectAll,
  onRecord,
  onSelect,
}) => {
  const { data: records } = useSWR<UserRecordType>(recordUrl);
  const { data: me } = useSWR<MeType>("/api/users/me");
  return (
    <ul className="px-5 relative pb-10 divide-y-[1px] mt-2 max-h-[80vh] text-sm rounded-md overflow-y-auto">
      <HeaderRow
        options={sorts}
        isSelected={isAllSelect}
        onSort={onSort}
        onSelectAll={onSelectAll}
      />
      {records?.records &&
        records.records.map((v) => {
          switch (me?.user?.role) {
            case "ADMIN":
              return (
                <AdminNameRecordRow
                  data={v}
                  key={v.id}
                  isPickable={true}
                  isSelected={selectList.includes(v.id + "")}
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
