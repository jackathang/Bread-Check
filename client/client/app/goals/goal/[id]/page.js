"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useSetsContext } from '@/app/hooks/goalSets/useSetsContext';
import { useGetSets } from "@/app/hooks/goalSets/useGetSets"; // Import the hook
import { useAuthContext } from "@/app/hooks/auth/useAuthContext";

import SetContent from '@/app/components/SetContent/SetContent';
import InviteForm from '@/app/components/InviteForm/InviteForm';
import SharedUsers from '@/app/components/SharedUsers/SharedUsers';
import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';

const GoalPage = ({ params }) => {
    const { id } = params; 
    const { sets, dispatch } = useSetsContext();
    const { user } = useAuthContext();
    const { getSets, isLoading, error } = useGetSets(); // Use getSets hook
    const [hasFetched, setHasFetched] = useState(false);
    const [foundSet, setFoundSet] = useState(null); // Initialize as null

    useEffect(() => {
        const fetchSets = async () => {
            // Check if user is logged in before fetching
            if (user && !hasFetched) {
                const fetchedSets = await getSets(); // Fetch sets
                if (fetchedSets) {
                    dispatch({ type: 'SET_SETS', payload: fetchedSets });
                    setHasFetched(true); // Mark as fetched
                }
            }
        };

        fetchSets();
    }, [user, getSets, dispatch, hasFetched]);

    useEffect(() => {
        // Search for the set with the matching _id after fetching
        const matchingSet = sets.find((set) => set._id === id);
        if (matchingSet) {
            setFoundSet(matchingSet);
        }
    }, [sets, id]); // Run when sets or id changes

    // Check if the set is found before rendering the content
    if (!foundSet) {
        return (
            <ProtectedRoute requireLoggedIn={true}>
                <div className="container bg-secondary">
                    <h1 className="font-center">No Set Exists</h1>
                    <Link className="font-center" href='/'><h2>Return to Dashboard</h2></Link>
                </div>
            </ProtectedRoute>
        );
    }

    // Show a loading state while fetching or if the set is not found
    if (isLoading) {
        return (
            <ProtectedRoute requireLoggedIn={true}>
                <div className="container">
                    <p>Loading</p>
                </div>
            </ProtectedRoute>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <ProtectedRoute requireLoggedIn={true}>
            <InviteForm set={foundSet} />
            <SharedUsers set={foundSet} />
            <div className="sets">
                <SetContent set={foundSet} />
            </div>
        </ProtectedRoute>
    );
};

export default GoalPage;
