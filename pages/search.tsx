import Layout from "@components/Layout";
import EditRecordModal from "@components/Modals/EditRecordModal";
import NameRecordRow from "@components/Row/UserRecordRow";
import DateRecordRow from "@components/Row/DateRecordRow";
import HeaderRow from "@components/Row/HeaderRow";
import SearchInput from "@components/SearchInput";
import SubSearch from "@components/SearchInput/SubSearch";
import {
  NameRecordAdminRowType,
  NameRecordAdminHeaderRowType,
  DateRecordAdminRowType,
  DateRecordAdminHeaderRowType,
  AdminRecordHeaderType,
  UserRecordHeaderType,
} from "@libs/client/types/dataTypes";
import { useCallback, useMemo, useState } from "react";

const record: NameRecordAdminRowType = {
  no: 1,
  name: "pak",
  start: "10:22",
  end: "10:30",
  duration: "11:20",
};

const options: NameRecordAdminHeaderRowType = {
  no: { isSort: true, colSpan: 1 },
  name: { isSort: true, colSpan: 2 },
  start: { isSort: true, colSpan: 2 },
  end: { isSort: true, colSpan: 2 },
  duration: { isSort: true, colSpan: 2 },
};

const record2: DateRecordAdminRowType = {
  no: 1,
  date: "2022-10-10",
  person: 10,
  durationAverage: 10,
};

const options2: DateRecordAdminHeaderRowType = {
  no: { isSort: true, colSpan: 1 },
  date: { isSort: true, colSpan: 2 },
  person: { isSort: true, colSpan: 2 },
  durationAverage: { isSort: true, colSpan: 2 },
};

const Search = () => {
  const initAdminThead: AdminRecordHeaderType = useMemo(
    () => ({
      ["#"]: { colSpan: 1 },
      name: { sort: null, colSpan: 2 },
      start: { sort: null, colSpan: 2 },
      end: { sort: null, colSpan: 2 },
      duration: { sort: null, colSpan: 2 },
    }),
    []
  );

  const initUserThead: UserRecordHeaderType = useMemo(
    () => ({
      createdAt: { sort: null, colSpan: 3 },
      start: { sort: null, colSpan: 2 },
      end: { sort: null, colSpan: 2 },
      duration: { sort: null, colSpan: 2 },
    }),
    []
  );

  const [showEditRecordModal, setShowEditRecordModal] = useState(false);
  const [standard, setStandard] = useState("name");

  const onStandard = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    setStandard((event.target as HTMLInputElement).value);
  }, []);

  const onCloseModal = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    setShowEditRecordModal(false);
  }, []);

  const onRecord = useCallback(() => {
    setShowEditRecordModal(true);
  }, []);

  return (
    <Layout>
      {/* <EditRecordModal isShow={showEditRecordModal} onClose={onCloseModal} /> */}
      <article className="flex flex-col justify-center items-center px-5 w-full">
        <form className="space-y-4 w-[90%] sm:w-[60%]">
          <SearchInput />
        </form>
        <SubSearch standard={standard} onStandard={onStandard} />
        <ul className="relative max-h-[80vh] w-full pb-10 px-5  divide-y-[1px] mt-5 overflow-y-auto text-sm rounded-md">
          {standard === "name" ? (
            <>
              <HeaderRow options={options} />
              {/* <NameRecordRow onClick={onRecord} data={record} /> */}
            </>
          ) : (
            <>
              <HeaderRow options={options2} />
              {/* <DateRecordRow data={record2} /> */}
            </>
          )}
        </ul>
      </article>
    </Layout>
  );
};

export default Search;
