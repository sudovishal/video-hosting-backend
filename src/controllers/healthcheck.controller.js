import mongoose from "mongoose"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const healthcheck = asyncHandler(async (_, res) => {
    //TODO: build a healthcheck response that simply returns the OK status as json with a message
    const healthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    }
    try {
        if(mongoose.connection.readyState !== 1) {
            throw new ApiError(500, "MongoDB is not healthy")
        }
        return res
        .status(200)
        .json(new ApiResponse(200, healthCheck, "Health check successful"));
    } catch (error) {
        healthCheck.message = error.message
        throw new ApiError(500, healthCheck.message);
    }
})

export {
    healthcheck
    }