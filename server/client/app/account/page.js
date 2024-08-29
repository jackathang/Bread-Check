"use client"
import { useAuthContext } from "@/app/hooks/auth/useAuthContext";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import UserPreferences from "./components/UserPreferences/UserPreferences";

export default function Account() {
    const { user } = useAuthContext();
    // if (!user) {
    //     return <div>Loading...</div>; // Or return null, or any other placeholder content
    // }

    return (
        <ProtectedRoute requireLoggedIn={true}>
            <div className="container bg-secondary">
                <h1>My Account</h1>
                <div className="">
                    <p>{user ? user.username : 'Username'}</p>
                    <p>{user ? user.email : 'Email'}</p>
                    <p>{user ? user._id : 'Id'}</p>
                </div>
            </div>
            <UserPreferences/>
        </ProtectedRoute>
    );
}
