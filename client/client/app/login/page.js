"use client";
import { useState } from 'react'
import { useLogin } from '../hooks/auth/userLogin';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password);
    }

    return (
        <ProtectedRoute requireLoggedIn = {false}>
            <div className = "container bg-secondary">
                <form className = "form" onSubmit = {handleSubmit}>
                    <h1>Login</h1>

                    {error && <div className = "error">Error: {error}</div>}

                    <div className= "inputContainer">
                       

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


                    <button disabled = { isLoading } className="cta-button">Sign In</button>
                    <div className = "row justify-center full-width">
                        <p>
                            Don&apos;t have an account?
                            &nbsp;
                            <Link href="/signup">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    )
}