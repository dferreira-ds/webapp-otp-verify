import React, { useState, useRef } from "react";
import { useOtpStore } from "../store/useOtpStore";
import Success from "../components/Success/Success";
import styles from "./Verify.module.scss";

const Verify = () => {
    const [verifyNumber, setVerifyNumber] = useState("");
    const attempt = useRef(0); //avoid unnecessary re-render

    const isSuccess= useOtpStore(state => state.isSuccess);
    const verify = useOtpStore(state => state.verify);

    const handleVerify = (event) => {
        const value = event.target.value;
        setVerifyNumber(value);
    }
    const submitVerify = () => {
        verify(verifyNumber);
        attempt.current = attempt.current + 1;
    };

    return (
        <div className={styles.container}>
            <input name="otp" type="text" placeholder="Verify your OTP" onChange={handleVerify} className={styles.inputbox} />
            <button type="submit" name="submit" onClick={submitVerify}>Send OTP</button>
            <Success isSuccess={isSuccess} attempt={attempt} />
            <a href="/">&#8592; Go back</a>
        </div>
    )
};

export default Verify;