"use client";
import { useState } from "react";
import { useSetsContext } from "./useSetsContext";
import { useAuthContext } from "../auth/useAuthContext";


export const useUpdateSet = () => {
    const [updateError, setUpdateError] = useState(null);
    const [updateIsLoading, setUpdateIsLoading] = useState(null);
    const {dispatch} = useSetsContext();
    const {user} = useAuthContext()

    const updateSet = async (set, data) => {
        if (!user) {
            setUpdateIsLoading(false);
            setUpdateError('User needs to be logged in');
            return;
        }

        setUpdateIsLoading(true);
        setUpdateError(null);

        const response = await fetch(`http://localhost:5000/api/sets/${set._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
  

        if (response.ok) {
            setUpdateIsLoading(false);
            setUpdateError(null);
            dispatch({ type: 'UPDATE_SET', payload: json });
            return json;
        }
        if (!response.ok) {
            setUpdateIsLoading(false);
            setUpdateError(json.error);
        }
    }

    return { updateSet, updateIsLoading, updateError };
}