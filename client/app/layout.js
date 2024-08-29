import "./globals.css";

import { SetContextProvider } from "./context/SetContext";
import { AuthContextProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar/Navbar";
import UserTheme from "./components/UserTheme/UserTheme";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bread-Check",
  description: "App to use to keep track of your saving goals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
            <SetContextProvider>
              <UserTheme/>
              <Navbar />
              <main className="font-main">
                {children}
              </main>
            </SetContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
