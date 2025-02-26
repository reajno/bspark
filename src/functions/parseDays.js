import mapDays from "./mapDays";
const parseDays = (operational_day) => {
  switch (operational_day) {
    case "5 DAYS":
    case "MON-FRI":
      return mapDays("MON-FRI"); // [1,2,3,4,5]
    case "6 DAYS":
      return mapDays("MON-SAT"); // [1,2,3,4,5,6]
    case "7":
    case "7 DAYS":
      return mapDays("MON-SUN"); // [1,2,3,4,5,6,7]
    case "SAT-SUN":
      return mapDays("SAT-SUN"); // [6,7]
    default:
      break;
  }
};

export default parseDays;
