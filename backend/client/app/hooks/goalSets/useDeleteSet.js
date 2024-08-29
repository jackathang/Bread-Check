"use client";
import { useState } from "react";
import { useSetsContext } from "./useSetsContext";
import { useAuthContext } from "../auth/useAuthContext";


export const useDeleteSet = () => {
    const [deleteError, setDeleteError] = useState(null);
    const [deleteIsLoading, setDeleteIsLoading] = useState(null);
    const {dispatch} = useSetsContext();
    const {user} = useAuthContext()

    const deleteSet = async (set) => {
        if (!user) {
            setDeleteIsLoading(false);
            setDeleteError('User needs to be logged in');
            return;
        }

        setDeleteIsLoading(true);
        setDeleteError(null);

        const response = await fetch(`http://localhost:5000/api/sets/${set._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${user.token}`
            }
        });
        const json = await response.json();
  

        if (response.ok) {
            setDeleteIsLoading(false);
            setDeleteError(null);
            dispatch({ type: 'DELETE_SET', payload: json });
            return json;
        }
        if (!response.ok) {
            setDeleteIsLoading(false);
            setDeleteError(json.error);
        }
    }

    return { deleteSet, deleteIsLoading, deleteError };
}