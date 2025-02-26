import parseDays from "./parseDays";
import parseTime from "./parseTime";

const transformData = (data) => {
  return data.map((item) => {
    const operational_day = parseDays(item.operational_day);
    const operational_time = parseTime(item.operational_time, operational_day);

    return { ...item, operational_day, operational_time };
  });
};

export default transformData;
