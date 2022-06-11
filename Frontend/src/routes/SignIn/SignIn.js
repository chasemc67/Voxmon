import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { useCallback, useState } from "react";
import './Signin.scss';
import { useHistory } from "react-router";


export const SignIn = () => {

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [disableButton, setDisableButton] = useState(true);
    const [errorState, setErrorState] = useState(null);
    const [isLoading, setisLoading] = useState(false);

    const history = useHistory();

    const handleEmailUpdate = useCallback((event) => {
        setEmailInput(event.target.value || '');
        if (event.target.value && passwordInput) {
            setDisableButton(false)
        } else {
            setDisableButton(true);
        }
    }, [passwordInput])

    const handlePasswordUpdate = useCallback((event) => {
        setPasswordInput(event.target.value || '');
        if (emailInput && event.target.value) {
            setDisableButton(false)
        } else {
            setDisableButton(true);
        }
    }, [emailInput])

    const createAccount = useCallback((event) => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, emailInput, passwordInput)
            .then((userCredential) => {
                // Signed in 
                setErrorState(null);
                history.push('/profile');
            })
            .catch((error) => {
                const errorCode = error.code;
                setErrorState(errorCode);

            }).finally(() => {
                setisLoading(false);
            });

            setisLoading(true);
    },[emailInput, history, passwordInput])

    const signIn = useCallback((event) => {
        const auth = getAuth();
        event.preventDefault();
        signInWithEmailAndPassword(auth, emailInput, passwordInput)
          .then((userCredential) => {
            // Signed in 
            setErrorState(null);
            history.push('/profile');
          })
          .catch((error) => {
            const errorCode = error.code;
            setErrorState(errorCode);
          });
    }, [emailInput, history, passwordInput])

    const SubmitForm = useCallback((event) => {
        if (event.which === 13) { //enter key
            signIn(event);
        }
    },[signIn])

    return (
        <div className="signin">
            <div className="signin-frame">
                <div className="signin-content">
                <form onKeyPress={SubmitForm}>
                        <p>Sign In</p>
                        <input type="email" value={emailInput} onChange={handleEmailUpdate} placeholder="Email"/>
                        <input type="password" value={passwordInput} onChange={handlePasswordUpdate} placeholder="Password"/>
                        <div className='signin-detail'>
                            {errorState === 'auth/email-already-in-use' && <p>This email is already in use</p>}
                            {errorState === 'auth/weak-password' && <p>Password must be at least 6 characters long</p>}
                            {errorState === 'auth/invalid-email' && <p>Email is not a valid email</p>}
                            {errorState === 'auth/wrong-password' && <p>Wrong password</p>}
                        </div>
                        <div className="signin-action-content">
                            <button type="button" disabled={isLoading || disableButton} className="submit-login light" onClick={signIn}>Sign In</button>
                            <button type="button" disabled={isLoading || disableButton} className="submit-login light" onClick={createAccount}>Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}