export class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    if(err.name === "JsonWebTokenError") {
        err.message = "JSON Web Token is invalid, try again";
        err = new ErrorHandler(err.message, 400);
    }
    if (err.name === "TokenExpiredError") {
        err.message = "JSON Web Token is expired, try again";
        err = new ErrorHandler(err.message, 400);
    }
    if (err.name === "CastError") {
        err.message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(err.message, 400);
    }

    const errorMessage = err.errors ? Object.values(err.errors)
    .map((error) => error.message).join(" ") : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;