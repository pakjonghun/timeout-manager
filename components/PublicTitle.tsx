import { NextPage } from "next";
import Icon from "./Icon";

interface props {
  indicator?: React.ReactNode;
  title: string;
  styles?: React.CSSProperties;
}

const PublicTitle: NextPage<props> = ({ indicator, title }) => {
  return (
    <div className="flex space-x-3">
      {indicator && <Icon indicator={indicator} role="success" />}
      <h1>{title}</h1>
    </div>
  );
};

export default PublicTitle;
