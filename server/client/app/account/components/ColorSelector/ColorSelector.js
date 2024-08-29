"use client";
import styles from './ColorSelector.module.css'
import { useState, useEffect } from "react";
import { useAuthContext } from '@/app/hooks/auth/useAuthContext';
import { useUpdate } from '@/app/hooks/auth/userUpdate';

export default function ColorSelector() {
  const { user, dispatch } = useAuthContext();
  const { update, isLoading, error } = useUpdate();

  const [lightMode, setLightMode] = useState(user?.theme?.lightMode || false);
  const [accentColor, setAccentColor] = useState(user?.theme?.accentColor || 'blue');

  // const toggleHighlighState

  const handleSubmit = async (e) => {
    e.preventDefault()

    const theme = {lightMode : lightMode, accentColor : accentColor}
    const data = { theme }
    update(data);
  }
    
  return (
    <div className="container no-margin no-padding full-width no-box-shadow"> 
      <form className="form" onSubmit={handleSubmit}>

          {/* {error && <div className="error">Error: {error}</div>} */}

          <div className="inputWrapper">
              <label><h3>Accent Color</h3></label>
              <div className={styles.buttonContainer}>
                <button type="button" onClick={() => setAccentColor('red')} className={`${styles.button} ${accentColor === 'red' ? styles.selected : ''}`} style={{ backgroundColor: 'var(--highlight-option-red-2)' }}></button>
                <button type="button" onClick={() => setAccentColor('orange')} className={`${styles.button} ${accentColor === 'orange' ? styles.selected : ''}`} style={{ backgroundColor: 'var(--highlight-option-orange-2)' }}></button>
                <button type="button" onClick={() => setAccentColor('green')} className={`${styles.button} ${accentColor === 'green' ? styles.selected : ''}`} style={{ backgroundColor: 'var(--highlight-option-green-2)' }}></button>
                <button type="button" onClick={() => setAccentColor('cyan')} className={`${styles.button} ${accentColor === 'cyan' ? styles.selected : ''}`} style={{ backgroundColor: 'var(--highlight-option-cyan-2)' }}></button>
                <button type="button" onClick={() => setAccentColor('blue')} className={`${styles.button} ${accentColor === 'blue' ? styles.selected : ''}`} style={{ backgroundColor: 'var(--highlight-option-blue-2)' }}></button>
                <button type="button" onClick={() => setAccentColor('purple')} className={`${styles.button} ${accentColor === 'purple' ? styles.selected : ''}`} style={{ backgroundColor: 'var(--highlight-option-purple-2)' }}></button>
                <button type="button" onClick={() => setAccentColor('magenta')} className={`${styles.button} ${accentColor === 'magenta' ? styles.selected : ''}`} style={{ backgroundColor: 'var(--highlight-option-magenta-2)' }}></button>
              </div>
          </div>

          <div className="inputWrapper">
              <label><h3>Dark Mode</h3></label>
              <input
                  className = "switch"
                  type="checkbox"
                  checked={!lightMode}
                  onChange={(e) => { setLightMode(!e.target.checked); }}
              />
              
          </div>

          <button className="cta-button">Save Preferences</button>
      </form>
    </div>
  )
}
