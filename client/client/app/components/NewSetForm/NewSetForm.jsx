import styles from './NewSetForm.module.css'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useCreateSet } from "@/app/hooks/goalSets/useCreateSet";
import { useAuthContext } from '@/app/hooks/auth/useAuthContext';

export default function NewSetForm() {
  const { createSet, createIsLoading, createError } = useCreateSet()
  const { user } = useAuthContext();
  
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [units, setUnits] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate inputs
    const total = Number(goal);
    const pieces = Number(units);

    if (total <= 0) {
      setError('Goal must be greater than 0');
      return;
    }
    if (pieces <= 0) {
      setError('Number of days must be greater than 0');
      return;
    }
    if (total < pieces) {
      setError('Goal must be equal to or exceed the number of days');
      return;
    }

    // Call splitNumberIntoPieces after validation
    const unitQuantities = splitNumberIntoPieces(total, pieces, Boolean(isChecked));
    const unitArray = unitQuantities.map(quantity => ({
      quantity,
      owner_id: '',
      status: false
    }));
    
    const set = { title, completed: 0, goal: Number(goal), units: unitArray, owner_username: user.username, owner_id: user._id, owner_color: user.theme.accentColor };

    const {response, json} = await createSet(set) 
    if (response.ok) {
      router.push(`/goals/goal/${json._id}`);

      // Resets form
      setTitle('')
      setGoal('');
      setUnits('');
      setIsChecked(false);
      setError(null);
    }
    

    
  }

  function splitNumberIntoPieces(total, pieces, type) {
    if (pieces > total) {pieces = total}

    let minSum = (pieces * (pieces + 1)) / 2;

    if (type) {
      let averageValue = total / pieces;
      let remainder = total - (Math.floor(averageValue) * pieces);
      let result = Array.from({ length: pieces }, (_, i) => Math.floor(averageValue));
      for (let i = 0; i < remainder; i++) {
        result[result.length - i - 1] += 1;
      }
      return result;
    }

    // Initialize the result with the first 'pieces' positive integers
    let result = Array.from({ length: pieces }, (_, i) => i + 1);
    let excess = total - minSum;

    // If total is less than minSum, calculate the difference and remove from the integers
    if (total < minSum) {
      let difference = minSum - total;

      // Loop through the array continuously removing 1 for each integer in the difference
      let index = 0;
      while (difference > 0) {
        if (result[index] > 1) { // Ensure integers remain positive
          result[index] -= 1;
          difference--;
        }
        index = (index + 1) % pieces; // Wrap around to the beginning
      }
    } else {
      // Distribute the excess amount evenly among the integers
      for (let i = 0; i < excess; i++) {
        result[i % pieces] += 1; // Distributing excess
      }
    }

    // Return the result
    return result;
  }

  return (
    <>
      <div className="container bg-secondary">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create New Goal</h1>

          {error && <div className="error">Error: {error}</div>}

          <div className="inputContainer">
            <div className="inputWrapper">
              <label>Create a Title</label>
              <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                maxLength = '16'
                required
              />
            </div>

            <div className="inputWrapper">
              <label>Set Goal</label>
              <input 
                type="number"
                onChange={(e) => setGoal(e.target.value)}
                value={goal}
                min="7"
                required
              />
            </div>

            <div className="inputWrapper">
              <label>Number of days to achieve goal</label>
              <input 
                type="number"
                onChange={(e) => setUnits(e.target.value)}
                value={units}
                min="7"
                required
              />
            </div>

            <div className="inputWrapper">
              <label>Equally Divide</label>
              <input
                className = "switch"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </div>
          </div>

          <button className="cta-button">Create New Set</button>
        </form>
      </div>

      <div className={`container ${styles.set}`}>
        <h2>${Number(goal).toLocaleString()}</h2>

        <div className={styles.setUnits}>
          {
            (() => {
              const total = splitNumberIntoPieces(Number(goal), Number(units), Boolean(isChecked));
              return total.map((value, index) => (
                <div key={index} className={`${styles.setUnit} container`}>
                  <span className={styles.unitQuantity}>${value}</span>
                </div>
              ));
            })()
          }
        </div>
      </div>
    </>
  );
}
