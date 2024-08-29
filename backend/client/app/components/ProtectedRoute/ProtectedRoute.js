"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from '@/app/hooks/auth/useAuthContext';

export default function ProtectedRoute({ requireLoggedIn, children }) {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    if (loading) return; 

    if (!requireLoggedIn && user) {
      router.push("/");
    } else if (requireLoggedIn && !user) {
      router.push("/login");
    }
  }, [loading, requireLoggedIn, user, router]);

  // Render children only if no redirection is needed
  return loading ? null : children;
}
