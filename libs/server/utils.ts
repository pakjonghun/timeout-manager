import { format } from "date-fns";
import { canStartTime } from "./constants";

export const getCanStartTime = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  return new Date(`${today} ${canStartTime}`);
};
