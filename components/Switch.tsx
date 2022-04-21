import { useMemo } from "react";
import { NextPage } from "next";
import { joinStyleClass } from "@libs/client/utils";

interface props {
  isOn: boolean;
  onSwitchName: React.ReactNode;
  offSwitchName: React.ReactNode;
  size?: {
    width: number;
    height: number;
  };
  styles?: React.CSSProperties;
  onSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch: NextPage<props> = ({
  isOn,
  onSwitchName,
  offSwitchName,
  size,
  styles,
  onSwitch,
}) => {
  const width = size ? size.width : 3;
  const height = size ? size.height : 1.25;
  const padding = width * 0.07;
  const translateX = width - 2 * padding - height;

  const labelStyles = useMemo(() => {
    return { width: `${width}rem`, padding: `${padding}rem` };
  }, [width, padding]);

  const smallStyles = useMemo(() => {
    return {
      height: `${height}rem`,
      ...(isOn && { transform: `translateX(${translateX}rem)` }),
    };
  }, [height, isOn, translateX]);

  return (
    <label
      style={{ ...labelStyles, ...styles, justifySelf: "flex-end" }}
      htmlFor="loginType"
      className={joinStyleClass(
        "rounded-md cursor-pointer",
        isOn ? "bg-red-400" : "bg-green-400"
      )}
    >
      <small
        style={smallStyles}
        className={joinStyleClass(
          "block aspect-square text-center rounded-md transition select-none",
          isOn ? "bg-red-50" : "bg-green-50"
        )}
      >
        {isOn ? onSwitchName : offSwitchName}
      </small>
      <input
        id="loginType"
        onChange={onSwitch}
        type="checkbox"
        className="hidden"
      />
    </label>
  );
};

export default Switch;
