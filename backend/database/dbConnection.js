import mongoose from "mongoose";

export const dbConnection = () => {

     mongoose.connect(process.env.MONGO_URI, {
      dbName: "Hamza_Hospital_Management_System",
    })
    .then (() => {
    console.log("Database connected successfully");
 }) 
 .catch ((err) => {
    console.log(`Some error in DB connection ${err}`);
  });
};