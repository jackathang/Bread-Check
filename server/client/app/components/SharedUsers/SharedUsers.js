import styles from './SharedUsers.module.css'
export default function SharedUsers({ set }) {
    const updatedSharedUsers = [...set.shared_users];

    return (
        <>
            {updatedSharedUsers.length > 0 && (
                <div className = "container bg-secondary">
                    <h2>Users</h2>

                    <div className = {'container stack no-padding no-margin no-box-shadow full-width gap-16'}>
                        <div className={`row align-center gap-16 bg-main container no-margin full-width`}>
                            <div className = {`${styles.userColor} bg-${set.owner_color}`}></div>
                            <p>{set.owner_username}</p>
                        </div>
                        {updatedSharedUsers && updatedSharedUsers.map((user, index) => (
                            <div 
                                className={`row align-center gap-16 bg-main container no-margin full-width`}
                                key = {index}>
                                <div className = {`${styles.userColor} bg-${user.color}`}></div>
                                <p>{user.username}</p>
                                
                            </div>
                        ))}
                    </div>
                    
                </div>
            )} 
        </>
    )
}
