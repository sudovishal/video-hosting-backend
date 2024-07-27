import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// hooks
// arrow function mei this ka context pata nahi hota

userSchema.pre("save", async function (next) { 
// While writing middlewares, next flag is used to pass the control to the next middleware/route
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// custom methods for mongoose middlewares
userSchema.methods.isPasswordCorrect = async function (password) {
  // console.log(password, this.password);
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // console.log(process.env.ACCESS_TOKEN_EXPIRY);
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      // expiresIn: "process.env.ACCESS_TOKEN_EXPIRY",
      expiresIn: "1d",
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      // expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      expiresIn:"7d"
    }
  );
};


export const User = mongoose.model("User", userSchema);
