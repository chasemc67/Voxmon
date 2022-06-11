import React, { useCallback, useState} from 'react';
import "./EmailCollector.scss";

import { submitEmail } from '../../api';

const EmailCollector = (props) => {
    const [emailState, setEmailState] = useState('unset');
    const [emailInput, setEmailInput] = useState('');

    const handleEmailUpdate = useCallback((event) => {
        setEmailInput(event.target.value || '');
    }, [setEmailInput]);

    const saveEmail = useCallback((event) => {
        if (emailInput) {
            setEmailState('saving');
            submitEmail(emailInput).then(res => {
                 if (res.status === 200) {
                     setEmailState('saved');
                 } else {
                     setEmailState('failed');
                 }
            }).catch(() => {
                setEmailState('failed')
            });
        }
     }, [emailInput, setEmailState]);

    const disableButton = emailState === 'saving';

    return(
        <div className="email-collector">
            <span>Stay in touch for more updates</span>
            <div className="email-input">
                <div className='email-input-flex'>
                    <input type="email" value={emailInput} onChange={handleEmailUpdate} placeholder="Email"/>
                    <button disabled={disableButton} className="send-email-btn light" onClick={saveEmail}>Submit</button>
                </div>
                <div className='submit-status'>
                    {emailState === 'saving' && <p>saving...</p>}
                    {emailState === 'failed' && <p>try again</p>}
                    {emailState === 'saved' && <p>saved</p>}
                </div>
            </div>
        </div>
    )
}

export default EmailCollector;