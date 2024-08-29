import styles from './SetContent.module.css';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import { useAuthContext } from '@/app/hooks/auth/useAuthContext';

import { useUpdateSet } from '@/app/hooks/goalSets/useUpdateSet';
import { useDeleteSet } from '@/app/hooks/goalSets/useDeleteSet';

import SetContentUnit from '@/app/components/SetContentUnit/SetContentUnit';


const SetContent = ({ set }) => {
    const { updateSet, updateIsLoading, updateError } = useUpdateSet()
    const { deleteSet, deleteIsLoading, deleteError } = useDeleteSet()

    const { user } = useAuthContext()

    console.log(set)

    const handleUnitToggle = async (set, unit, index) => {
        // Toggle the status of the unit at the specified index
        const updatedUnits = set.units.map((u, i) =>
            i === index ? { ...u, status: !u.status , color: user.theme.accentColor, owner_id: user._id } : u
        );

        const completed = unit.status ? set.completed - unit.quantity : set.completed + unit.quantity
        
        const data = { completed: completed, units: updatedUnits }

        // Send the updated set to the server
        updateSet(set, data);
    };

    return (
        <div key={set._id} className={`container ${styles.set}`}>
            <div className="row justify-between align-center">
                <h2>
                    <Link href={`/goals/goal/${set._id}`} className = "font-main">
                        {set.title}
                    </Link>     
                </h2>

                <span className={styles.delete} onClick={async () => {deleteSet(set)}}>
                    Delete
                </span>
            </div>

            <div className="row justify-between align-center">
                <h3 
                    className = {set.completed >= set.goal ? styles.set__complete : styles.set__uncomplete}
                >
                    {set.completed} / {set.goal}
                </h3>
            </div>

            <div className={styles.setUnits}>
                {set.units && set.units.map((unit, index) => (
                    <SetContentUnit
                        key={index}
                        unit={unit}
                        set = {set}
                        onToggle={() => handleUnitToggle(set, unit, index)}
                    />
                ))}
            </div>

            <div className="row" style={{marginTop: 1 + 'rem'}}>
                <p className = "font-secondary">Created {formatDistanceToNow(new Date(set.createdAt), { addSuffix: true })}</p>
            </div>

            <div className="font-secondary">
                <p>Updated {formatDistanceToNow(new Date(set.updatedAt), { addSuffix: true })}</p>
            </div>

        </div>
    );
};

export default SetContent;
