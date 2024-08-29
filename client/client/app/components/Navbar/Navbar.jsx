"use client";
import Link from "next/link"
import styles from "./Navbar.module.css"
import { useLogout } from "@/app/hooks/auth/userLogout"
import { useAuthContext } from '@/app/hooks/auth/useAuthContext';

export default function Navbar() {
  const {user} = useAuthContext();
  const { logout } = useLogout()

  const handleLogout = () => {
    logout();
  }

  return (
    <div className={`container font-main bg-secondary ${styles.navbar}`}>
      {/* signed out */}
      {!user && (
          <div className = "row full-width justify-between align-center">
            <img className = {styles.icon} src={'/Bread-Check-Icon-blue.png'}></img>
            <div className = "row gap-16 align-center">
              <Link href="/login">Login</Link>
              <Link href="/signup">Register</Link> 
            </div>
          </div>
      )}
      {/* signed in */}
      {user && (
        <div className = "row full-width justify-between align-center">
          <Link href="/"><img className = {styles.icon} src={`/Bread-Check-Icon-${user.theme.accentColor}.png`}></img></Link>
          <div className = "row gap-16 align-center">
            <Link href = "/account" ><span>{user.username}</span></Link>
            <button className = "cta-button" onClick = {handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  )
}
