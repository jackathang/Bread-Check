"use client";
import { useState } from "react";
import { useSetsContext } from "./useSetsContext";
import { useAuthContext } from "../auth/useAuthContext";


export const useCreateSet = () => {
    const [createError, setCreateError] = useState(null);
    const [createIsLoading, setCreateIsLoading] = useState(null);
    const {dispatch} = useSetsContext();
    const {user} = useAuthContext()

    const createSet = async (data) => {
        if (!user) {
            setCreateIsLoading(false);
            setCreateError('User needs to be logged in');
            return;
        }

        setCreateIsLoading(true);
        setCreateError(null);

        const response = await fetch(`http://localhost:5000/api/sets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
  

        if (response.ok) {
            setCreateIsLoading(false);
            setCreateError(null);
            dispatch({ type: 'CREATE_SET', payload: json });
            return {response, json};
        }
        if (!response.ok) {
            setCreateIsLoading(false);
            setCreateError(json.error);
            console.log(json.error)
        }
    }

    return { createSet, createIsLoading, createError };
}