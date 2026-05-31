import dayjs from "dayjs";
import { trim } from "lodash";

export const pickFields = (obj: Record<string, unknown>) => {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    let value: unknown = obj[key];
    if (dayjs.isDayjs(value)) {
      value = value.format("YYYY-MM-DD");
    } else if (typeof value === "string") {
      value = trim(value);
    }
    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      value !== "Invalid Date"
    ) {
      result[key] = value;
    }
  }
  return result;
};
