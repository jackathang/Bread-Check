import { useAuthContext } from '@/app/hooks/auth/useAuthContext';
import styles from './SetContentUnit.module.css';

const SetContentUnit = ({ set, unit, onToggle }) => {
    return (
        <div
            onClick={onToggle}
            className=
            {`
                ${styles.setUnit} 
                ${unit.status ? styles.status_complete : styles.status_uncomplete} 
                bg-${unit.status ? (unit.owner_id == set.owner_id ? set.owner_color : (set.shared_users.find(shared_user => shared_user._id === unit.owner_id)?.color)) : ''} 
                container
            `}
        >
            <p className={styles.unitQuantity}>{unit.quantity}</p>
        </div>
    );
};

export default SetContentUnit;
