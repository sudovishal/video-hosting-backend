import { Router } from "express";
import {createTweet, getUserTweets, updateTweet, deleteTweet } from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-tweet").post(verifyJWT, createTweet);
router.route("/user-tweets").get(verifyJWT, getUserTweets);
router.route("/delete-tweet/:id").delete(verifyJWT, deleteTweet);
router.route("/update-tweet/:id").put(verifyJWT, updateTweet);

export default router;