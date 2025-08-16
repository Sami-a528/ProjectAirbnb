const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuther } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Post review routes
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReviews));
// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuther, wrapAsync(reviewController.destroyReview));
module.exports = router;