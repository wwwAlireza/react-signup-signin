import React, { useState, useRef } from 'react';
import styles from "../styles/signup/signup.module.css";
import Input from './Input';

const Signup = () => {
    const { container, signupContainer, title, inputsContainer } = styles;

    let [username, setUsername] = useState('');
    let usernameRef = useRef();
    const usernameHandler = () => {
        setUsername(usernameRef.current.value);
    }
    return (
        <>
            <div className={container}>
                <div className={signupContainer}>
                    <h1 className={title}>Sign Up</h1>
                    <div className={inputsContainer}>
                        <Input changer={usernameHandler} cref={usernameRef} initialValue={username} type="text" placeholder="username" isCorrect={true} incorrectCause='' />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Signup;