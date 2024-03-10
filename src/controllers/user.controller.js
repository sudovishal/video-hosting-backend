import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res, next) => {
  // get user details 
  // validation - not empty
  // check if user already exists
  // check for images, check for avatar 
  // upload them to cloudinary
  // create user object - create entry in DB
  // remove password and refresh token field from response
  // check for user creation 
  // return response else error

  const { fullname, email, username, password }= req.body
  // if( fullname === "") {
  //   throw new ApiError(400, "Full Name is required")
  // } beginner style

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
      throw new ApiError(400, "All fields required!")
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
    // https://www.mongodb.com/docs/manual/reference/operator/query/
  });

  if(existedUser) {
      throw new ApiError(409, "User with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path

let coverImageLocalPath;
if (
  req.files &&
  Array.isArray(req.files.coverImage) &&
  req.files.coverImage.length > 0
) {
  coverImageLocalPath = req.files.coverImage[0].path;
}
  // ?.  optional chaining

  if(!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById( user._id).select(
    "-password -refreshToken" // kya nahi chahiye
  )
  if(!createdUser) {
    throw new ApiError(500, "Somewthing went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User signed up successfully")
    )
});
export { registerUser };

//  my logic before watching hitesh's solution
// 1. taking fields required for register by req.body
// 2. check if user already exists in the database
// 3. password validation
// 4. hashing the password
// 5. save the avatar and coverimage to local server and then to cloudinary
// 6. save the data to mongodb