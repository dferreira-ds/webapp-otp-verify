import { create } from "zustand";
import { devtools } from "zustand/middleware";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/otp`;

export const useOtpStore = create(devtools((set, get) => ({
    isSuccess: false,
    userData: "",
    channel: "",
    isLoading: false,
    createOtp: async (data, channel) => {
        set({ isLoading: true, userData: data, channel });
        const toNumber = data.countryCode + data.toNumber;
        try {
            const resp = await fetch(API_URL + "/sendOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ toNumber: toNumber, channel: channel })
            });

            if (resp.ok) {
                const data = await resp.json();
                set({ isLoading: false, isSuccess: data.success });
            }
        }
        catch (err) {
            set({ isLoading: false, isSuccess: false });
            console.log("Max attempts: ", err);
        }
    },
    verify: async (verifyNumber) => {
        set({ isLoading: true });
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
            }

            if (response.approved === "pending") {
                set({ isSuccess: false });
            }

            set({ isLoading: false });
        }
        catch (err) {
            console.log(err);
        };
    },
})));