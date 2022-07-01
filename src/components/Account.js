import React from 'react';
import styles from "../styles/account/account.module.css"

const Account = () => {
    const signedUser = sessionStorage.getItem("signedUser");
    const { container, headerText, bodyText, headerText_hello } = styles;
    return (
        <>
            <div className={container}>
                <h1 className={headerText}><span className={headerText_hello}>Hello</span> {signedUser} !</h1>
                <p className={bodyText}>welcome. But I must say that this system is completely training :)</p>
            </div>
        </>
    )
};

export default Account;