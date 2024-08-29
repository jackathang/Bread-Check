"use client";
import NewSetForm from "@/app/components/NewSetForm/NewSetForm";
import ProtectedRoute from "@/app/components/ProtectedRoute/ProtectedRoute";

export default function page() {
  return (
    <ProtectedRoute requireLoggedIn = {true}>
      <NewSetForm></NewSetForm>
    </ProtectedRoute>
  )
}
