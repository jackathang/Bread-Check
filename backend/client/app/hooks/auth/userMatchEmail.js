"use client";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useMatchEmail = () => {
    const { user } = useAuthContext();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const match = async (email) => {
        if (!email) {
            setError('Email is required');
            return;
        }
        
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/api/user/matchemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify({ email })
        })
        
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // update authcontext
            setIsLoading(false);
            
            // return the id matched to the email
            return { json };
        }
    }

    return { match, isLoading, error };
}