import React from 'react';
import styles from "../styles/signup/signup.module.css";

const Signup = () => {

    const { container, signupContainer, title } = styles;
    return (
        <>
            <div className={container}>
                <div className={signupContainer}>
                    <h1 className={title}>Sign Up</h1>
                </div>
            </div>
        </>
    )
};

export default Signup;