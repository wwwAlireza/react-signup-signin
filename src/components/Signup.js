import React, { useState, useRef, useReducer } from 'react';
import styles from '../styles/signup/signup.module.css';
import Input from './Input';

const basicRules = {
    usernameMaxLength: 20,
    usernameMinLength: 5,
    emailMaxLength: 40,
    emailMinLength: 8,
}
const basicRegexp = {
    username: /^[a-zA-Z0-9]+$/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
}

// data reducer
const dataReducer = (state, action) => {
    if (action.action == 'setValue') {
        return { ...state, value: action.value }
    } else if (action.action == 'setIsCorrect') {
        return { ...state, isCorrect: action.value, incorrectCause: action.cause }
    }
};

// username data
const usernameData = {
    value: '',
    isCorrect: true,
    incorrectCause: ''
};

// email data
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
    const emailRef = useRef();
    const emailHandler = (eventData) => {
        const emailValue = eventData.target.value;
        if (emailValue.length <= basicRules.emailMaxLength) {
            dispatchEmail({ action: 'setValue', value: emailRef.current.value })
        }
    };
    const emailBlurHandler = (eventData) => {
        const emailValue = eventData.target.value;
        if (!emailValue) {
            dispatchEmail({ action: 'setIsCorrect', value: false, cause: 'email required !' });
        } else if (!basicRegexp.email.test(emailValue) || emailValue.length < basicRules.emailMinLength) {
            dispatchEmail({ action: 'setIsCorrect', value: false, cause: 'Please enter the email in the correct format' });
        } else {
            dispatchEmail({ action: 'setIsCorrect', value: true, cause: '' });
        }
    };


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