import { useEffect, useState } from "react";
import transformData from "../functions/transformData";

const useParkingData = (latitude, longitude) => {
  const [loading, setLoading] = useState(true);
  const [parkingLocations, setParkingLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/getParkingData?latitude=${latitude}&longitude=${longitude}`
        );
        const data = await response.json();
        const result = await transformData(data);

        setParkingLocations(result);
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return { parkingLocations, loading, error };
};
export default useParkingData;
