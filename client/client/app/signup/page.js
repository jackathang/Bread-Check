"use client";
import { useState } from 'react'
import { useSignup } from '../hooks/auth/userSignup';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Link from 'next/link';

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, email, password);
    }

    return (
        <ProtectedRoute requireLoggedIn = {false}>
            <div className = "container bg-secondary">
                <form className = "form" onSubmit = {handleSubmit}>
                    <h1>Signup</h1>

                    {error && <div className = "error">Error: {error}</div>}

                    <div className= "inputContainer">
                        <div className = "inputWrapper">
                            <label>Username</label>
                            <input 
                                type="text"
                                onChange = {(e) => {
                                    setUsername(e.target.value)
                                }}
                                value = {username}
                                required
                            />
                        </div>

                        <div className = "inputWrapper">
                            <label>Email</label>
                            <input 
                                type="email"
                                onChange = {(e) => {
                                    setEmail(e.target.value)
                                }}
                                value = {email}
                                required
                            />
                        </div>
                        
                        <div className = "inputWrapper">
                            <label>Password</label>
                            <input 
                                type="password"
                                onChange = {(e) => setPassword(e.target.value)}
                                value = {password}
                                required
                            />
                        </div>
                    </div>


                    <button disabled = { isLoading } className="cta-button">Sign Up</button>
                    <div className = "row justify-center full-width">
                        <p>
                            Already have an account?
                            &nbsp;
                            <Link href="/login">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    )
}
