import { FC } from "react";

import { Calendar as ANTCalendar, CalendarProps } from "antd";
import { Dayjs } from "dayjs";

interface UxCalendarProps extends CalendarProps<Dayjs> {
  testId: string;
}

export const UxCalendar: FC<UxCalendarProps> = ({ testId, ...rest }) => {
  return <ANTCalendar data-testid={testId} {...rest} />;
};
