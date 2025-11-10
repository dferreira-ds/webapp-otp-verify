import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaSms } from "react-icons/fa";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { countries } from "./countries.js";
import { useOtpStore } from "../../store/useOtpStore.js";
import styles from "./Otp.module.scss";

const Otp = () => {
    const navigate = useNavigate();
    const { createOtp } = useOtpStore();
    
    const [data, setData] = useState({
        countryCode: "",
        toNumber: "",
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const channel = e.nativeEvent.submitter.value;

        if (data.toNumber === "" || channel === "") {
            return console.error("Destination number or channel are missing.");
        }

        // Navigate first, then create OTP
        navigate("/verify");
        await createOtp(data, channel);
    };

    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <select name="countryCode" id="user-select" onChange={handleChange}>
                    {Object.entries(countries).map(([key, value], i) => {
                        return (
                            <option value={key} key={i}>{value}</option>
                        )
                    })} 
                </select>
                <input
                    name="toNumber"
                    type="text"
                    placeholder="Enter your number..."
                    onChange={handleChange}
                    value={data.toNumber}
                    required 
                />
                <p className={styles.paragraph}>You will receive a code to confirm your registration.</p>
                <div className={styles.buttons}>
                    <button 
                        type="submit"
                        value="sms"
                    >
                        Receive code by SMS &nbsp; <FaSms size={20} />
                    </button>
                    <button
                        type="submit"
                        value="whatsapp"
                    >
                        Receive code by WhatsApp &nbsp; <FaWhatsapp size={20} />
                    </button>
                    <button
                        type="submit"
                        value="call"
                    >
                        Receive code by phone call &nbsp; <BsFillTelephoneInboundFill size={20} />
                    </button>
                </div>
            </form>
        </div>
    )
};

export default Otp;