import mapDays from "./mapDays";

const parseTime = (operational_time, operational_day) => {
  const formatted = operational_time
    // Replace "&" with ","
    .replace(/&/g, ",")
    // Replace parentheses with a space
    .replace(/\((.*?)\)/g, " $1")
    // Replace "," with "-" between letters
    .replace(/(?<=[A-Z]),(?=[A-Z])/g, "-");
  // Split by active time blocks
  // // E.G. formatted result = 7AM-7PM, 7PM-10PM MON-FRI, 7AM-7PM SAT-SUN

  const operationalBlocks = formatted.split(/,\s?/);

  return operationalBlocks.map((block) => {
    // E.G. split result = [["7AM-7PM", undefined], ["7PM-10PM", "MON-FRI"], ["7AM-7PM, "SAT-SUN"]]
    const [timeRange, daysString] = block.split(" ");
    const [start, end] = timeRange.split("-");
    const result = { start, end };
    let days;
    if (daysString) {
      // E.G. days = [1, 2, 3, 4, 5]
      days = mapDays(daysString);
    } else {
      days = [operational_day];
    }
    result.days = days;
    return result;
  });

  // E.G. operational_time = [
  // {
  // "start": "7AM",
  // "end": "7PM",
  // "days": [
  //       1,
  //       2,
  //       3,
  //       4,
  //       5,
  //       6,
  //       7
  //  ],
  // },
  // {
  //  "start": "7PM",
  //  "end": "10PM",
  //  "days": [
  //       1,
  //       2,
  //       3,
  //       4,
  //       5
  //   ],
  // },
  // {
  // "start": "7AM",
  // "end": "7PM",
  // "days": [
  //       6,
  //       7
  //   ],
  //  }
  // ]
};

export default parseTime;
