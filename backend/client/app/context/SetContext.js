"use client";
import { createContext } from 'react'
import { useReducer } from 'react';

export const SetContext = createContext();

export const setsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SETS':
            return {sets : action.payload};
        case 'CREATE_SET':
            return { sets: [action.payload, ...state.sets] };
        case 'DELETE_SET':
            return { sets : state.sets.filter((s) => s._id !== action.payload._id) };
        case 'UPDATE_SET':
            return {
                sets: state.sets.map((set) =>
                    set._id === action.payload._id ? action.payload : set
                ),
            };
        default:
            return state;
    }
}

export const SetContextProvider = ( {children } ) => {
    const [state, dispatch] = useReducer(setsReducer, {
        sets: []
    })

    return (
        <SetContext.Provider value = {{...state, dispatch}}>
            { children }
        </SetContext.Provider>
    )
}