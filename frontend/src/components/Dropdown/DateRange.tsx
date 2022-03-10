import DatePicker from "react-datepicker";
import dayjs, { Dayjs } from "dayjs";

const DateRange = ({
  date,
  onChange,
}: {
  date: { startDate: Date | null; endDate: Date | null };
  onChange: (arg: { startDate: Dayjs | null; endDate: Dayjs | null }) => void;
}): JSX.Element => {
  const { startDate, endDate } = date;

  const handleDateChange = (dates: Date | [Date | null, Date | null] | null) => {
    if (Array.isArray(dates)) {
      const start = dayjs(dates[0]).startOf("day");
      const end = dates[1] === null ? null : dayjs(dates[1]).endOf("day");
      onChange({ startDate: start, endDate: end });
    }
  };

  return (
    <DatePicker selected={startDate} onChange={handleDateChange} startDate={startDate} endDate={endDate} selectsRange inline />
  );
};

export default DateRange;
