import React, { useState, useRef } from "react";
import { useOtpStore } from "../store/useOtpStore";
import Success from "../components/Success/Success";
import Spinner from "../components/Spinner/Spinner";
import styles from "./Verify.module.scss";

const Verify = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const attempt = useRef(0);
    const code = useRef("");

    const { isSuccess, isLoading, verify } = useOtpStore();

    const handleChange = (e) => {
        code.current = e.target.value;
    }

    const submitVerify = async (e) => {
        // prevent default if called from a form/button submit event
        e.preventDefault();
        
        await verify(code.current);
        
        attempt.current = attempt.current + 1;
        
        setIsSubmit(true);
    }

    return (
        <div className={styles.container}>
            {isSubmit ? (
                <Success isSuccess={isSuccess} attempt={attempt.current} />
            ) : (
                !isLoading && isSuccess ? (
                    <>
                        <input
                            name="otp"
                            type="text"
                            placeholder="Verify your OTP"
                            className={styles.inputbox}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            name="submit"
                            onClick={submitVerify}
                        >
                            Send OTP
                        </button>
                    </>
                ) : (                
                    <Spinner />
                )
            )}
            <a href="/">&#8592; Go back</a>
        </div>
    )
};

export default Verify;