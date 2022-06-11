import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {updateProfile} from 'firebase/auth';

import './Profile.scss';

export const Profile = () => {

    const {user} = useAuth();
    const [displayName, setDisplayName] = useState(user && user.displayName);


    useEffect(() => {
        user && user.displayName && setDisplayName(user.displayName)
    },[user])


    const onDisplayNameUpdate = useCallback(event => {
        setDisplayName(event.target.value);
    }, [setDisplayName]);

    const onSaveClicked = useCallback(() => {
        updateProfile(user, {
            displayName: displayName
        })
    }, [displayName, user])


    return (
        <div className="profile">
            <div className="profile-frame">
                    <div className='profile-header'>
                        <h1>Profile</h1>
                    </div>
                    <div className="profile-content">
                        <div className={'profile-detail'}>
                            <h2>display name:</h2>
                            <input placeholder='username' value={displayName} onChange={onDisplayNameUpdate}></input>
                        </div>
                        <div className={'profile-detail'}>
                            <h2>email:</h2>
                            <p>
                                {user && user.email}
                            </p>
                        </div>
                    </div>
                    <div className="profile-footer">
                        <button onClick={onSaveClicked}>Save</button>
                    </div>
            </div>
        </div>
    )
}