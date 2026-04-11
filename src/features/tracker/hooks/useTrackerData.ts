// src/features/tracker/hooks/useTrackerData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import type { CollegeTurnout, TallyApiResponse } from '../types';

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
        
        // Handle varying backend response structures (direct array vs wrapped object)
        const actualArray = Array.isArray(payload) ? payload : payload?.data;

        // 1. Array Validation: Reject if the backend drops the payload entirely
        if (!Array.isArray(actualArray) || actualArray.length === 0) {
          throw new Error("Received empty or malformed data payload.");
        }

        // 2. Schema Validation: Reject if Google Sheets formulas break and return strings/nulls instead of numbers
        const isStructurallyValid = actualArray.every((item) => 
          typeof item === 'object' && item !== null &&
          typeof item.college === 'string' && item.college.trim() !== '' &&
          typeof item.count === 'number' && !isNaN(item.count) &&
          typeof item.total === 'number' && !isNaN(item.total)
        );

        if (!isStructurallyValid) {
          console.error("Payload failed schema validation:", actualArray);
          throw new Error("Data stream corrupted. Schema mismatch detected.");
        }

        // Payload is structurally sound. Accept it regardless of value increases/decreases.
        setData(actualArray);
        setError(null);

      } catch (err) {
        // Retain last known good data array on failure
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