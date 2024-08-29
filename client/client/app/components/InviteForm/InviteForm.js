import { useState } from 'react'
import { useSetsContext } from '@/app/hooks/goalSets/useSetsContext';
import { useAuthContext } from '@/app/hooks/auth/useAuthContext';
import { useMatchEmail } from '@/app/hooks/auth/userMatchEmail';

export default function InviteForm({ set }) {
    const {match,  error : matchEmailError, isLoading} = useMatchEmail();
    const { user } = useAuthContext();
    const { sets, dispatch } = useSetsContext();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submitMessage, setSubmitMessage] = useState('');

    const handleAddSharedUser = async (response) => {
        if (!user) {
            return; 
        }
    
        // Check if the called id is equal to the user's own id
        if (response._id === user._id) {
            setError("You cannot invite yourself.");
            return;
        }
    
        // Create an object for the shared user
        const newSharedUser = { _id: response._id, email: response.email, username: response.username, color: response.theme.accentColor };
    
        // Check if the user is already in the shared_users array
        const updatedSharedUsers = [...set.shared_users];
        if (updatedSharedUsers.some(user => user.user_id === response._id)) {
            setError('User is already invited to this sheet');
            return;  // Stop the request from going through
        }
    
        // If the id is not in the array and not the user's own id, add it
        updatedSharedUsers.push(newSharedUser);
    
        // Send the updated set to the server
        const patchResponse = await fetch(`http://localhost:5000/api/sets/${set._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ shared_users: updatedSharedUsers }),
        });
    
        const json = await patchResponse.json();
    
        if (patchResponse.ok) {
            // Clear any existing error submitMessages and update the set
            setError('');
            setEmail('');
            setSubmitMessage(`${response.username} has been invited to access this sheet.`)
            dispatch({ type: 'UPDATE_SET', payload: json });
        } else {
            setSubmitMessage('');
            setError(`Error: ${json.error}`);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const { json } = await match(email);
        handleAddSharedUser(json);
    }

    return (
        <>
        <div className = "container bg-secondary">
                <h1>{set.title}</h1>
                <p className="title">Invite a friend!</p>
                <form className = "form" onSubmit = {handleSubmit}>

                    {(error || matchEmailError) && (
                        <div className="error">Error: {error || matchEmailError}</div>
                    )}

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


                        <button disabled = { isLoading } className="cta-button">Invite User</button>

                        {submitMessage && <div className = "submitMessage"><p>{submitMessage}</p></div>}
                    </div>
                </form>
            </div>
        </>
    )
}
