import { set } from "date-fns";
import { startHour } from "./constants";

export const getCanStartTime = () =>
  new Date(set(new Date(), { hours: startHour, minutes: 0 }));
