import { useEffect, useState } from "react";
import type { TallyApiResponse } from "../types/";
import type { CollegeTurnout } from "../types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useTrackerData = () => {
  const [data, setData] = useState<CollegeTurnout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTally = async () => {
      try {
        const response = await axios.get<TallyApiResponse>(`${API_URL}/tally`);
        const payload = response.data;
        const actualArray = Array.isArray(payload) ? payload : payload?.data;

        if (Array.isArray(actualArray)) {
          setData(actualArray);
          setError(null);
        } else {
          console.error("API returned unrecognized format:", payload);
          setData([]); // Prevent crashes
          setError("Data format error from server.");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occured while fetching tally data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTally();
    // const intervalId = setInterval(fetchTally, 60000);

    // return () => clearInterval(intervalId)
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return {
    data,
    isLoading,
    error,
  };
};
