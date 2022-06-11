import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getAuth().currentUser);
    const [user, setUser] = useState(getAuth().currentUser);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setIsLoggedIn(true);
              setUser(user);
              // ...
            } else {
             setIsLoggedIn(false);
             setUser(null);
            }
          });
        return () => {
            unsubscribe();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signOutCallback = useCallback(() => {
        signOut(getAuth());
    },[]);

    return {
        isLoggedIn,
        user,
        signOut: signOutCallback
    }
}