import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { config } from "dotenv";
import messageRouter from "./routes/messageRouter.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
config({ path: "./config/config.env" }); 

app.use(cors({
  origin: [process.env.FRONTEND_URI, process.env.DASHBOARD_URI],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({useTempFiles:true, tempFileDir:"/tmp/"}));
app.use(errorMiddleware);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);


export default app;
