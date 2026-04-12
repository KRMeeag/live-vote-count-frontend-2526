import { useState, useEffect } from "react";
import axios from "axios";
import type { CollegeTurnout, TallyApiResponse } from "../types";

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

        if (!Array.isArray(actualArray) || actualArray.length === 0) {
          throw new Error("Received empty or malformed data payload.");
        }

        const isStructurallyValid = actualArray.every(
          (item) =>
            typeof item === "object" &&
            item !== null &&
            typeof item.college === "string" &&
            item.college.trim() !== "" &&
            typeof item.count === "number" &&
            !isNaN(item.count) &&
            typeof item.total === "number" &&
            !isNaN(item.total),
        );

        if (!isStructurallyValid) {
          throw new Error("Data stream corrupted. Schema mismatch detected.");
        }

        // Sanitize the underReview column (handles Google Sheets string/boolean quirks)
        const sanitizedData = actualArray.map((item) => ({
          ...item,
          underReview:
            item.underReview === true ||
            String(item.underReview).toUpperCase() === "TRUE",
        }));

        setData(sanitizedData);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) setError(err.message);
        else if (err instanceof Error) setError(err.message);
        else setError("An unexpected connection error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    // 1. Fetch immediately on mount
    fetchTally();

    // 2. Calculate offset to the next exact minute (XX:00)
    const now = new Date();
    const msUntilNextMinute =
      60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

    let intervalId: ReturnType<typeof setInterval>;

    // 3. Wait for the exact minute to align, then fetch and start the 60s loop
    const timeoutId = setTimeout(() => {
      fetchTally();
      intervalId = setInterval(fetchTally, 60000);
    }, msUntilNextMinute);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return { data, isLoading, error };
};
