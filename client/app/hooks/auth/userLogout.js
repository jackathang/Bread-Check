"use client";
import { useAuthContext } from "./useAuthContext";
import { useSetsContext } from "../goalSets/useSetsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch :setsDispatch} = useSetsContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // logout user from context
        dispatch({type: 'LOGOUT'})
        
        // clear previously stored sets from context
        setsDispatch({type: 'SET_SETS', payload: null})
    }

    return { logout };
}