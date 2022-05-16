import React, { useState, useRef, useReducer } from 'react';
import styles from '../styles/signup/signup.module.css';
import Input from './Input';

const usernameInitial = {
    value: '',
    isCorrect: true,
    incorrectCause: ''
}
const usernameReducer = (state, action) => {
    if (action.action == 'setValue') {
        return { ...state, value: action.value }
    } else if (action.action == 'setIsCorrect') {
        return { ...state, isCorrect: action.value, incorrectCause: action.cause | '' }
    }
}

const Signup = () => {
    const { container, signupContainer, title, inputsContainer } = styles;

    let usernameRef = useRef();
    const usernameHandler = () => {
        dispatchUsername({ action: 'setValue', value: usernameRef.current.value })
    }

    const [username, dispatchUsername] = useReducer(usernameReducer, usernameInitial)
    return (
        <>
            <div className={container}>
                <div className={signupContainer}>
                    <h1 className={title}>Sign Up</h1>
                    <div className={inputsContainer}>
                        <Input changer={usernameHandler} cref={usernameRef} initialValue={username.value} type="text" placeholder="username" isCorrect={username.isCorrect} incorrectCause={username.incorrectCause} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Signup;