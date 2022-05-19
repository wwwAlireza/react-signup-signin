import React, { useRef, useEffect } from 'react';
import styles from '../styles/input/input.module.css';

const Input = ({ changer, cref, initialValue, placeholder, type, isCorrect, incorrectCause, blur }) => {
    const { inputContainer, input, inputPlaceholder, activeInput, dangerInput, dangerCause } = styles;
    const containerRef = useRef();
    useEffect(() => {
        if (isCorrect) {
            containerRef.current.classList.remove(dangerInput)
            if (initialValue) {
                containerRef.current.classList.add(activeInput)
            } else {
                containerRef.current.classList.remove(activeInput)
            }
        } else {
            containerRef.current.classList.add(dangerInput)
        }

    })
    return (
        <>
            <div className={inputContainer} ref={containerRef}>
                <input className={input} ref={cref} onChange={changer} onBlur={blur} value={initialValue} type={type} spellCheck="false" />
                <span className={inputPlaceholder} onClick={() => { cref.current.focus() }}>{placeholder}</span>
                <div className={dangerCause} style={{ visibility: `${isCorrect ? 'hidden' : 'visible'}` }}>{incorrectCause}</div>
            </div>
        </>
    )
};

export default Input;