import React, { useState, useRef, useReducer } from 'react';
import styles from '../styles/signup/signup.module.css';
import Input from './Input';

const basicRules = {
    usernameMaxLength: 20,
    usernameMinLength: 5
}
const basicRegexp = {
    username: /^[a-zA-Z0-9]+$/,
}

// username reducer engine
const usernameData = {
    value: '',
    isCorrect: true,
    incorrectCause: ''
};
const dataReducer = (state, action) => {
    if (action.action == 'setValue') {
        return { ...state, value: action.value }
    } else if (action.action == 'setIsCorrect') {
        return { ...state, isCorrect: action.value, incorrectCause: action.cause }
    }
};

// username reducer engine
const emailData = {
    value: '',
    isCorrect: true,
    incorrectCause: ''
};


const Signup = () => {
    const { container, signupContainer, title, inputsContainer } = styles;

    // username
    const [username, dispatchUsername] = useReducer(dataReducer, usernameData)
    let usernameRef = useRef();
    const usernameHandler = (eventData) => {
        const usernameValue = eventData.target.value;
        if (usernameValue.length <= basicRules.usernameMaxLength) {
            dispatchUsername({ action: 'setValue', value: usernameRef.current.value })
        }
    }
    const usernameBlurHandler = (eventData) => {
        const usernameValue = eventData.target.value;
        if (!basicRegexp.username.test(usernameValue)) {
            dispatchUsername({ action: 'setIsCorrect', value: false, cause: 'username should just be a combination of letters and numbers' })
        }
        else {
            if (usernameValue.length >= basicRules.usernameMinLength) {
                if (isNaN(usernameValue[0])) {
                    dispatchUsername({ action: 'setIsCorrect', value: true, cause: '' })
                }
                else {
                    dispatchUsername({ action: 'setIsCorrect', value: false, cause: 'username should start with the letter' })
                }
            }
            else {
                dispatchUsername({ action: 'setIsCorrect', value: false, cause: 'username must be at least 5 and at most 20 letters' })
            }
        }
    }

    // email
    const [email, dispatchEmail] = useReducer(dataReducer, emailData)


    return (
        <>
            <div className={container}>
                <div className={signupContainer}>
                    <h1 className={title}>Sign Up</h1>
                    <div className={inputsContainer}>
                        <Input changer={usernameHandler} blur={usernameBlurHandler} cref={usernameRef} initialValue={username.value} type="text" placeholder="username" isCorrect={username.isCorrect} incorrectCause={username.incorrectCause} />
                        <Input changer={emailHandler} blur={emailBlurHandler} cref={emailRef} initialValue={email.value} type="email" placeholder="email" isCorrect={email.isCorrect} incorrectCause={email.incorrectCause} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Signup;