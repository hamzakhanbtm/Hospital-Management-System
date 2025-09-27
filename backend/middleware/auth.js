import {User} from "../model/userSchema.js";
import { ErrorHandler } from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";

export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized to access this resource`, 403));
    }
    next();
});


export const isPatientAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.id);
    if (req.user.role !== "patient") {
        return next(new ErrorHandler(`${req.user.role} not authorized to access this resource`, 403));
    }
    next();
});