import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [3, "First name must contain at least 3 characters"],
    },
   lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [3, "Last name must contain at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        minLength: [11, "Phone number must be 11 characters"],
        maxLength: [11, "Phone number must be 11 characters"],
    },
    
    nic : {
        type: String,
        // required: [true, "NIC is required"],
        minLength: [13, "NIC must be at least 13 characters"],
        maxLength: [13, "NIC must be at most 13 characters"],

    }, 
    dob : {
        type: String,
        required: [true, "Date of Birth is required"],
    },
    gender: {
        type: String,
        required: true,
        enum : ["male", "female"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "patient", "doctor"],
    },
    doctorDepartment: {
        type: String,
    },
    doctorAvatar: {
        public_id: String,
        url: String,
    }
})


export const User = mongoose.model("User", userSchema);
export default User;

userSchema.pre("save", async function (next) { //.pre means before saving the user
    if (!this.isModified("password")) { 
        return next(); // If password is not modified, proceed to the next middleware
    }
    this.password = await bcrypt.hash(this.password, 10); 
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
};
// above code is for generating token for user authentication
//explain the method above
// The generateJsonWebToken method creates a JWT containing the user's ID,
// signed with a secret key, and sets an expiration time for the token.