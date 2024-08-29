"use client";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUpdate = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {user, dispatch} = useAuthContext();

    const update = async (data) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:5000/api/user/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        })
        
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // save user token to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update authcontext
            dispatch({type: 'UPDATE', payload: json})

            setIsLoading(false);
        }
    }

    return { update, isLoading, error };
}