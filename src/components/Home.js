import React from "react";
import styles from "../styles/home/home.module.css";
import userIcon from "../icons/user.svg";
import { Link } from "react-router-dom";
import useTitle from '../hooks/useTitle';

const Home = () => {
    useTitle("Home")
    const { container, selectContainer, signup, signin, icon, selectOption } = styles;
    return (
        <>
            <div className={container}>
                <div className={selectContainer}>
                    <Link to="/signup" className={`${signup} ${selectOption}`}>Sign-up</Link>
                    <Link to="/signin" className={`${signin} ${selectOption}`}>Sign-in</Link>
                    <div className={icon}><img src={userIcon} /></div>
                </div>
            </div>
        </>
    )
};

export default Home;