import React, { useReducer, useRef, useState, useEffect } from 'react';
import useTitle from '../hooks/useTitle';
import styles from "../styles/signin/signin.module.css";
import Input from './Input';
import useDatabase from '../hooks/useDatabase';
import { useNavigate } from 'react-router-dom';

// rules
const basicRules = {
    usernameMaxLength: 20,
    usernameMinLength: 5,
    passwordMaxLength: 20,
    passwordMinLength: 8,
}

// data reducer & data
const dataReducer = (state, action) => {
    if (action.action == 'setValue') {
        return { ...state, value: action.value }
    } else if (action.action == 'setIsCorrect') {
        return { ...state, isCorrect: action.value, incorrectCause: action.cause }
    }
};

const usernameData = {
    value: '',
    isCorrect: true,
    incorrectCause: ''
};

const passwordData = {
    value: '',
    isCorrect: true,
    incorrectCause: ''
};

const Signin = () => {
    useTitle("Sign in");
    const { container, signinContainer, title, inputsContainer, signinFooter, signinBtn } = styles;
    const databaseHandler = useDatabase("database");
    const pageNavigate = useNavigate();

    // username
    const [username, dispatchUsername] = useReducer(dataReducer, usernameData);
    let usernameRef = useRef();
    const usernameHandler = (eventData) => {
        const usernameValue = eventData.target.value;
        if (usernameValue.length < basicRules.usernameMaxLength) {
            dispatchUsername({ action: 'setValue', value: usernameValue });
            dispatchUsername({ action: 'setIsCorrect', value: true });
        }
    };

    // password
    const [password, dispatchPassword] = useReducer(dataReducer, passwordData);
    let passwordRef = useRef();
    const passwordHandler = (eventData) => {
        const passwordValue = eventData.target.value;
        if (passwordValue.length < basicRules.passwordMaxLength) {
            dispatchPassword({ action: 'setValue', value: passwordValue });
            dispatchPassword({ action: 'setIsCorrect', value: true });
        };
    };

    // data checker
    let [inputsIsCorrect, setInputsIsCorrect] = useState(false);
    const mainInputs = [username, password];
    useEffect(() => {
        mainInputs.map(data => {
            if (data.value && data.isCorrect) {
                setInputsIsCorrect(true);
            } else {
                setInputsIsCorrect(false);
            }
        })
    });

    // signin handler
    const signinHandler = (username, password) => {
        let userIsExist = databaseHandler({ type: "CHECK", username: username.toLowerCase() });
        if (userIsExist.exist) {
            let user = databaseHandler({ type: 'READ', username: username.toLowerCase() });
            // final signin
            if (user.password == password) {
                sessionStorage.setItem("signedUser", username);
                pageNavigate("/account", { replace: true });
            } else {
                dispatchUsername({ action: 'setIsCorrect', value: false, cause: 'Username is wrong' });
                dispatchPassword({ action: 'setIsCorrect', value: false, cause: 'Password is wrong' });
            }
        } else {
            dispatchUsername({ action: 'setIsCorrect', value: false, cause: 'Username is wrong' });
            dispatchPassword({ action: 'setIsCorrect', value: false, cause: 'Password is wrong' });
        }
    };

    // click handler
    const signinClickHandler = () => {
        let usernameValue = usernameRef.current.value;
        let passwordValue = passwordRef.current.value;
        if (usernameValue.length < basicRules.usernameMinLength) {
            dispatchUsername({ action: 'setIsCorrect', value: false, cause: 'Enter the username correctly' })
        } else if (passwordValue.length < basicRules.passwordMinLength) {
            dispatchPassword({ action: 'setIsCorrect', value: false, cause: 'Enter the password correctly' })
        } else {
            signinHandler(usernameValue, passwordValue);
        }
    };

    return (
        <>
            <div className={container}>
                <div className={signinContainer}>
                    <h1 className={title}>Sign In</h1>
                    <form className={inputsContainer}>
                        <Input changer={usernameHandler} cref={usernameRef} initialValue={username.value} type="text" placeholder="username" isCorrect={username.isCorrect} incorrectCause={username.incorrectCause} />
                        <Input changer={passwordHandler} cref={passwordRef} initialValue={password.value} type="password" placeholder="password" isCorrect={password.isCorrect} incorrectCause={password.incorrectCause} />
                    </form>
                    <div className={signinFooter}>
                        <button className={signinBtn} disabled={inputsIsCorrect ? false : true} onClick={signinClickHandler} >Sign in</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Signin;