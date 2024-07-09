import { create } from "zustand";
import { devtools } from "zustand/middleware";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/otp`;

export const useOtpStore = create(devtools((set, get) => ({
    isSuccess: false,
    userData: {},
    createOtp: async (data) => {
        set({ userData: data });
        const toNumber = data.countryCode + data.toNumber;
        try {
            await fetch(API_URL + "/sendOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ toNumber: toNumber, channel: data.channel })
            });
        }
        catch (err) {
            console.log(err);
        }
    },
    verify: async (verifyNumber) => {
        const data = get().userData;
        const toNumber = data.countryCode + data.toNumber

        try {
            const resp = await fetch(API_URL + "/verifyOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ toNumber: toNumber, otp: verifyNumber })
            });

            const response = await resp.json();
            if (response.approved === "approved") {
                set({ isSuccess: true });
            };
        }
        catch (err) {
            console.log(err);
        };
    }
})));