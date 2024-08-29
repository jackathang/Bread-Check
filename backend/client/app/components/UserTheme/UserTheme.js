"use client";
import { useEffect } from "react";
import { useAuthContext } from "@/app/hooks/auth/useAuthContext";

export default function DarkMode() {
  const { user } = useAuthContext();

  const resetMain = async () => {
    document.documentElement.style.setProperty('--default-1', 'var(--light-default-1)');
    document.documentElement.style.setProperty('--default-2', 'var(--light-default-2)');
    document.documentElement.style.setProperty('--default-3', 'var(--light-default-3)');
    document.documentElement.style.setProperty('--default-4', 'var(--light-default-4)');
    document.documentElement.style.setProperty('--default-5', 'var(--light-default-5)');
    document.documentElement.style.setProperty('--default-6', 'var(--light-default-6)');
    document.documentElement.style.setProperty('--default-7', 'var(--light-default-7)');

    document.documentElement.style.setProperty('--default-font-1', 'var(--dark-default-7)');
    document.documentElement.style.setProperty('--default-font-2', 'var(--dark-default-6)');
  }

  const resetHighlights = async () => {
    document.documentElement.style.setProperty('--highlight-1', `var(--highlight-option-blue-1)`);
    document.documentElement.style.setProperty('--highlight-2', `var(--highlight-option-blue-2)`);
    document.documentElement.style.setProperty('--highlight-3', `var(--highlight-option-blue-3)`);
  }

  useEffect(() => {
    // Check if user and user.theme are defined
    if (user && user.theme) {
      // Set dark mode styles based on lightMode
      if (!user.theme.lightMode) {
        document.documentElement.style.setProperty('--default-1', 'var(--dark-default-1)');
        document.documentElement.style.setProperty('--default-2', 'var(--dark-default-2)');
        document.documentElement.style.setProperty('--default-3', 'var(--dark-default-3)');
        document.documentElement.style.setProperty('--default-4', 'var(--dark-default-4)');
        document.documentElement.style.setProperty('--default-5', 'var(--dark-default-5)');
        document.documentElement.style.setProperty('--default-6', 'var(--dark-default-6)');
        document.documentElement.style.setProperty('--default-7', 'var(--dark-default-7)');

        document.documentElement.style.setProperty('--default-font-1', 'var(--light-default-1)');
        document.documentElement.style.setProperty('--default-font-2', 'var(--light-default-2)');
      } else {
        resetMain();
      }

      if (user.theme.accentColor) {
        document.documentElement.style.setProperty('--highlight-1', `var(--highlight-option-${user.theme.accentColor}-1)`);
        document.documentElement.style.setProperty('--highlight-2', `var(--highlight-option-${user.theme.accentColor}-2)`);
        document.documentElement.style.setProperty('--highlight-3', `var(--highlight-option-${user.theme.accentColor}-3)`);
      }
    }
    if (!user) {
      resetMain();
      resetHighlights();
    }
  }, [user]); // Add user as a dependency to run the effect whenever user changes

  return null; // Or return any JSX if needed
}