"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useSetsContext } from "@/app/hooks/goalSets/useSetsContext";
import { useGetSets } from "@/app/hooks/goalSets/useGetSets";
import { useAuthContext } from "@/app/hooks/auth/useAuthContext";

// components
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SetContent from "./components/SetContent/SetContent";

export default function Home() {
  const { sets, dispatch } = useSetsContext();
  const { user } = useAuthContext();
  const { getSets, isLoading, error } = useGetSets();
  const [hasFetched, setHasFetched] = useState(false); 

  useEffect(() => {
    const fetchSets = async () => {
      if (user && !hasFetched) {
        const fetchedSets = await getSets();
        if (fetchedSets) {
          dispatch({ type: 'SET_SETS', payload: fetchedSets });
          setHasFetched(true);
        }
      }
    };

    fetchSets();
  }, [user, getSets, dispatch, hasFetched]);

  return (
    <ProtectedRoute requireLoggedIn={true}>
      <div className="container bg-secondary">
        <h1>Dashboard</h1>
        <Link className="cta-button" href="/goals/create-new">Create New Goal</Link>
      </div>
      
      <div className="sets">
        {isLoading && <div className="container bg-secondary text-center">Loading sets...</div>}
        {error && <p>{error}</p>}
        {sets && sets.map((set) => (
          <SetContent key={set._id} set={set}></SetContent>
        ))}
      </div>
    </ProtectedRoute>
  );
}
