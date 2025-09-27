import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" }); 

dbConnection(); 

app.listen(process.env.PORT, () => {
    console.log(`Server is working on port ${process.env.PORT}`);
});



