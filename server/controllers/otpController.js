import asyncHandler from "express-async-handler";
import { twilioClient } from "../utls/utils.js";

// Send otp
export const sendOtp = asyncHandler (async (req, res) => {
    const serviceSid = process.env.TWILIO_SERVICE_SID;
    const { channel, toNumber } = req.body;
    try {
        const otpResponse = await twilioClient().verify.v2.services(serviceSid).verifications.create({
            to: toNumber,
            channel: channel,
        });

        return res.status(200).json({ success: true });
    }
    catch (err) {
        return res.status(500).json({ success: false, "error": err.message });
    };
    
});

// Verify otp
export const verifyOTP = asyncHandler (async (req, res) => {
    const serviceSid = process.env.TWILIO_SERVICE_SID;
    const { toNumber, otp } = req.body;

    try {
        const verify = await twilioClient().verify.v2.services(serviceSid)
            .verificationChecks
            .create({
                to: toNumber,
                code: otp
            });

        return res.status(200).json({ approved: verify.status });
    }
    catch (err) {
        return res.status(500).json({ "error": err.message });
    };
});