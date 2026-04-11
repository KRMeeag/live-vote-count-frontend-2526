// src/features/tracker/hooks/useTrackerData.ts
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import type { CollegeTurnout, TallyApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const useTrackerData = () => {
  const [data, setData] = useState<CollegeTurnout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use a ref to strictly track the highest valid vote count 
  // without triggering unnecessary re-renders.
  const highestTotalRef = useRef<number>(0);

  useEffect(() => {
    const fetchTally = async () => {
      try {
        const response = await axios.get<TallyApiResponse>(`${API_URL}/tally`);
        const payload = response.data;
        const actualArray = Array.isArray(payload) ? payload : payload?.data;

        if (!Array.isArray(actualArray) || actualArray.length === 0) {
          throw new Error("Received empty or malformed data payload.");
        }

        const incomingTotal = actualArray.reduce((acc, curr) => acc + curr.count, 0);

        // Monotonicity Check: Votes should never go down.
        // If they do, the backend/Sheets integration has dropped data.
        if (incomingTotal < highestTotalRef.current) {
           console.warn("Data integrity error: Incoming votes are lower than historical votes. Rejecting payload.");
           throw new Error("Data stream corrupted. Retaining last known good data.");
        }

        // Payload is valid. Update state and ref.
        highestTotalRef.current = incomingTotal;
        setData(actualArray);
        setError(null);

      } catch (err) {
        // Do NOT clear the data array here. Retain last known state.
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected connection error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTally();
    const intervalId = setInterval(fetchTally, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return { data, isLoading, error };
};