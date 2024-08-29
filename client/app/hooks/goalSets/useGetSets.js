"use client";
import { useState } from "react";
import { useAuthContext } from "../auth/useAuthContext";


export const useGetSets = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {user} = useAuthContext()

    const getSets = async () => {
        if (!user) {
            setIsLoading(false);
            setError('User needs to be logged in');
            return;
        }

        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/api/sets', {
          headers: {
            'Authorization' : `Bearer ${user.token}`
          }
        });
        const json = await response.json();
  

        if (response.ok) {
            setIsLoading(false);
            setError(null);
            return json;
        }
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
    }

    return { getSets, isLoading, error };
}