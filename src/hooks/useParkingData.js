import { useEffect, useState } from "react";
import transformData from "../functions/transformData";

const useParkingData = () => {
  const [loading, setLoading] = useState(true);
  const [parkingLocations, setParkingLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getParkingData");
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
  }, []);

  return { parkingLocations, loading, error };
};
export default useParkingData;
