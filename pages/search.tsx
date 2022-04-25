import Layout from "@components/Layout";
import EditRecordModal from "@components/Modals/EditRecordModal";
import NameRecordRow from "@components/Row/UserRecordRow";
import DateRecordRow from "@components/Row/DateRecordRow";
import HeaderRow from "@components/Row/HeaderRow";
import SearchInput from "@components/SearchInput";
import SubSearch from "@components/SearchInput/SubSearch";

import { useCallback, useMemo, useState } from "react";
import { useAppSelector } from "@libs/client/useRedux";
import Records from "@components/Records";
import { joinStyleClass } from "@libs/client/utils";

const Search = () => {
  const [standard, setStandard] = useState("name");

  const onStandard = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    setStandard((event.target as HTMLInputElement).value);
  }, []);

  const userRole = useAppSelector((state) => state.user.role);
  const isFilterShow = useAppSelector((state) => state.search.isShowFilter);

  return (
    <Layout
      canGoBack={false}
      title={userRole === "ADMIN" ? "기록검색" : "내 기록 검색"}
    >
      {/* <EditRecordModal isShow={showEditRecordModal} onClose={onCloseModal} /> */}
      <article className="relative flex flex-col justify-center items-center px-5 w-full">
        <div
          className={joinStyleClass(
            isFilterShow
              ? "absolute inset-0 w-full h-full z-20 backdrop-blur-sm"
              : ""
          )}
        />
        <form className="space-y-4 w-[90%] sm:w-[60%]">
          <SearchInput />
        </form>
        <SubSearch standard={standard} onStandard={onStandard} />
        <ul className="relative max-h-[80vh] w-full pb-10 px-5  divide-y-[1px] mt-5 overflow-y-auto text-sm rounded-md">
          {standard === "name" ? (
            <>
              <Records
                classes={joinStyleClass(
                  "grid w-full",
                  userRole === "ADMIN"
                    ? "grid-rows-[55vh,3vh]"
                    : "grid-rows-[70vh,3vh]"
                )}
                isSubMenuShow={false}
              >
                {/* <div>dhildren</div> */}
              </Records>
            </>
          ) : (
            <>
              {/* <HeaderRow options={options2} /> */}
              {/* <DateRecordRow data={record2} /> */}
            </>
          )}
        </ul>
      </article>
    </Layout>
  );
};

export default Search;
