import { menus } from "@libs/client/constants";
import { memo } from "react";
import Menus from "./Menus";

const SideMenus = () => {
  return <Menus menus={menus} />;
};

export default memo(SideMenus);
