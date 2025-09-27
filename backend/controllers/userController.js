import { ErrorHandler } from "../middleware/errorMiddleware.js";
import { User } from "../model/userSchema.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import cloudinary from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncError(async(req, res, next) => {
    const {firstName, lastName, email, phone, nic, dob, gender, password} = req.body;
    if(!firstName || !lastName || !email || !phone || !nic || !dob ||!gender || !password){
        return next(new ErrorHandler("Please Fill All The Fields!", 400));
    }

    const user = await User.create ({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "patient",
    })
    generateToken(user, "Registered Successfully!", 201, res);
});

export const login = catchAsyncError(async(req, res, next) => {
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    if(password !== confirmPassword){
        return next(
            new ErrorHandler("Password does not match", 400));
    }

const user = await User.findOne({email}).select("+password");
if(!user){
    return next(new ErrorHandler("Invalid Email or Password", 401));
}

const isPasswordMatched = await user.comparePassword(password);
if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid Email or Password", 401));
}
if (user.role !== role){
    return next(new ErrorHandler("Please select the correct role", 401));
}

generateToken(user, `Welcome back, ${user.firstName} ${user.lastName}`, 200, res);
});


export const addNewAdmin = catchAsyncError(async(req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return next(new ErrorHandler("Only admins can add new admins", 403));
    }
    const {firstName, lastName, email, phone, nic, dob, gender,password} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !dob || !gender || !nic){
        return next(new ErrorHandler("Please Fill All The Fields!", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("Admin already registered", 409));
    }
    const admin = await User.create ({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "admin",
    })
    res.status(201).json({
        success: true,
        message: "New Admin Added Successfully",
        admin,
    });
});

export const getAllDoctors = catchAsyncError(async(req, res, next) => {

    const doctors = await User.find({role: "doctor"});
    res.status(200).json({
        success: true,
        doctors,
    });

});


export const logoutAdmin = catchAsyncError(async(req, res, next) => {
    res.status(200).cookie("adminToken", null, {
        expires: new Date(Date.now()),
        secure:true,
        sameSite: "None",
        httpOnly: true,
    }).json({
        success: true,
        message: "Logged Out Successfully",
    });
});


export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const addNewDoctor = catchAsyncError(async(req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Please upload an image", 400));
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("Only .jpeg, .jpg and .png formats are allowed!", 400));
    }
    const {firstName, lastName, email, phone, nic, dob, gender,password, doctorDepartment} = req.body;
    if(!firstName || !lastName || !email || !phone || !password || !dob || !gender || !nic || !doctorDepartment){
        return next(new ErrorHandler("Please Fill All The Fields!", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("Doctor already registered", 409));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
 if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );}
    const doctor = await User.create ({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "doctor",
        doctorDepartment,
        doctorAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    })
    res.status(201).json({
        success: true,
        message: "New Doctor Added Successfully",
        doctor,
    });
}); 

export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully.",
    });
});





