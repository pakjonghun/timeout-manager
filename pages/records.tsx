import Layout from "@components/Layout";
import Records from "@components/Records";
import { useAppSelector } from "@libs/client/useRedux";
import { joinStyleClass } from "@libs/client/utils";

const Record = () => {
  const userRole = useAppSelector((state) => state.user.role);

  return (
    <Layout
      title={userRole === "ADMIN" ? "오늘 초과근무 현황" : "초과근무 내역"}
      canGoBack={false}
    >
      <Records
        classes={joinStyleClass(
          "grid w-full mt-10",
          userRole === "ADMIN"
            ? "grid-rows-[6vh,60vh,3vh]"
            : "grid-rows-[70vh,3vh]"
        )}
      />
    </Layout>
  );
};

export default Record;
