import { useHistory } from "react-router";
import { useCallback } from "react";
import { Popover, PopoverContent } from "../components/Popover";
import { useAuth } from "../hooks/useAuth";
import {getAuth} from 'firebase/auth';
import {useWallet} from 'use-wallet';

export const AccountButton = (props) => {
    const history = useHistory();
    const {isLoggedIn, signOut} = useAuth();
    const wallet = useWallet();

    const onProfileClick = useCallback(() => {
        history.push('/profile');

    }, [history])

    const onSignInClick = useCallback(() => {
        history.push('/signIn');
    }, [history]);

    const onSignOut = useCallback(() => {
        wallet.reset();
        signOut(getAuth);
        history.push('');
    }, [history, signOut, wallet])

    return (
        <Popover>

            { !isLoggedIn ? 
                <button className="navButton" onClick={onSignInClick}>
                    Sign In
                </button>
            :
                <button className="navButton" onClick={onProfileClick}>
                    Profile
                </button>
            }
            <PopoverContent hidden={!isLoggedIn}>
                <button id="signout_button" onClick={onSignOut}>
                    Sign Out
                </button>
            </PopoverContent>
        </Popover>
    )
}