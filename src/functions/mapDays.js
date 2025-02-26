const dayMap = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 7 };

// E.G. daysString = "MON-FRI"
const mapDays = (daysString) => {
  const [start, end] = daysString.split("-");
  const startDay = dayMap[start];
  const endDay = dayMap[end];
  const placeholderArr = Array(endDay - startDay + 1).fill(0);

  const mapped = placeholderArr.reduce((acc, _, i) => {
    acc.push(startDay + i);
    return acc;
  }, []);

  return mapped;
};

export default mapDays;
