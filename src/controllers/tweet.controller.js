import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet

  try {
    const { content } = req.body;
    //   console.log(req.user._id);
    //   console.log(content);

    if (!content) {
      throw new ApiError(400, "Text is required");
    }

    const tweet = await Tweet.create({
      content,
      owner: req.user._id,
    });
    res
      .status(200)
      .json(new ApiResponse(200, tweet, "Tweet created successfully"));
  } catch (error) {
    throw new ApiError(400, "There was a problem while creating the tweet");
  }
});

const getUserTweets = asyncHandler(async (req, res) => {
  //   TODO: get user tweets
  const userId = req.user._id;
  try {
    const tweets = await Tweet.find({ owner: userId });
    res
      .status(200)
      .json(new ApiResponse(200, tweets, "Tweets fetched successfully"));
  } catch (error) {
    throw new ApiError(400, "There was a problem while fetching the tweets");
  }
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
  const { content } = req.body;
  const tweetId = req.params.id;
  try {
  } catch (error) {
    new ApiError(500, "There was a problem while updating the tweet");
  }
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const tweetId = req.params.id;
  try {
    const deletedTweet = await Tweet.findOneAndDelete({
      _id: tweetId,
      owner: req.user._id,
    });
    if (!deletedTweet) {
      throw new ApiError(404, "Tweet not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, deletedTweet, "Tweet deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "There was a problem while deleting the tweet");
  }
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
