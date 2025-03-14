import { DateTime } from "luxon";

const useParkingStatus = () => {
  const getStatus = (operationalTime) => {
    try {
      if (operationalTime) {
        const now = DateTime.local();
        const today = now.weekday;

        for (const block of operationalTime) {
          // Need to add condition for time format "ha" vs "h:mma"
          const start = DateTime.fromFormat(block.start, "ha");
          const end = DateTime.fromFormat(block.end, "ha");

          if (block.days.includes(today) && now >= start && now <= end) {
            const timeLeft = end.diff(now, ["hours", "minutes"]).toObject();

            return {
              isFree: false,
              timeLeft: {
                hours: timeLeft.hours,
                minutes: Math.ceil(timeLeft.minutes),
              },
            };
          }
          return { isFree: true, timeLeft: null };
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { getStatus };
};
export default useParkingStatus;
