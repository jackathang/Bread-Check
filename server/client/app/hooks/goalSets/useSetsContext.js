"use client";
import { SetContext } from "../../context/SetContext";
import { useContext } from "react";

export const useSetsContext = () => {
    const context = useContext(SetContext)

    if (!context) {
        throw Error('useSetContext must be used inside a SetsContextProvider')
    }

    return context;
}