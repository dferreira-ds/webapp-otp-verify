import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import otpRoute from "./routes/otpRoute.js";

dotenv.config();

const app = express();

//Middlewares
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

//routes
app.use("/api/v1/otp", otpRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});