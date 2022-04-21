import { memo } from "react";
import Menus from "./Menus";

const MainNavMenus = () => {
  const menus = [
    { name: "HOME", link: "/" },
    { name: "BOARD", link: "/posts" },
    { name: "RECORD", link: "/records" },
  ];

  return <Menus menus={menus} />;
};

export default memo(MainNavMenus);
