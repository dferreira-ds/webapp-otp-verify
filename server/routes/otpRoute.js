import express from "express";
import { sendOtp, verifyOTP } from "../controllers/otpController.js";

const router = express.Router();

//message routes
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOTP);

export default router;