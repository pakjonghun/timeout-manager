import { NextPage } from "next";
import Icon from "./Icon";
import { RoleType, SizeType } from "@libs/client/types/styleTypes";

interface props {
  indicator: React.ReactNode;
  title: string;
  role: RoleType;
  size?: SizeType;
  styles?: React.CSSProperties;
}

const ModalTitle: NextPage<props> = ({ indicator, title, role, size }) => {
  return (
    <div className="flex space-x-3">
      {indicator && <Icon indicator={indicator} role={role} size={size} />}
      <h1>{title}</h1>
    </div>
  );
};

export default ModalTitle;
