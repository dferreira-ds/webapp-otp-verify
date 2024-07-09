import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaSms } from "react-icons/fa";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { countries } from "./countries.js";
import { useOtpStore } from "../../store/useOtpStore.js";
import styles from "./SendOtp.module.scss";

const Message = () => {
    const navigate = useNavigate();
    const createOtp = useOtpStore(state => state.createOtp);
    
    const [data, setData] = useState({
        countryCode: "",
        toNumber: "",
        channel: "",
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value });
    };
    
    const handleButtonClick = (event) => {
        console.log(event.target);
        setData({ ...data, "channel": event.target.name });
    };

    const submitotp = (e) => {
        e.preventDefault();
        createOtp(data);
        console.log(data);
        navigate("/verify");
    };

    return(
        <div className={styles.container}>
            <form onSubmit={submitotp}>
                <select name="countryCode" id="user-select" onChange={handleChange}>
                    {Object.entries(countries).map(([key, value], i) => {
                        return (
                            <option value={key} key={i}>{value}</option>
                        )
                    })}
                </select>
                <input name="toNumber" type="text" placeholder="Enter your number" onChange={handleChange} />
                <p className={styles.paragraph}>You will receive a code to confirm your registration.</p>
                <div className={styles.buttons}>
                    <button type="submit" name="sms" onClick={handleButtonClick}>
                        Receive code by SMS &nbsp; <FaSms size={20} />
                    </button>
                    <button type="submit" name="whatsapp" onClick={handleButtonClick}>
                        Receive code by WhatsApp &nbsp; <FaWhatsapp size={20} />
                    </button>
                    <button type="submit" name="call" onClick={handleButtonClick}>
                      Receive code by phone call &nbsp; <BsFillTelephoneInboundFill size={20} />
                    </button>
                </div>
            </form>        
        </div>
    )
};

export default Message;