const Review = require("../models/reviewModel");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

// add review

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();

    // calculate average rating and update in program
    const averageRating = await Review.aggregate([
      {
        $match: { program: req.body.program },
      },
      {
        $group: {
          _id: "$program",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const averageRatingValue = averageRating[0]?.averageRating || 0;

    await Program.findOneAndUpdate(req.body.program, {
      rating: averageRatingValue,
    });

    res
      .status(200)
      .json({ message: "Review added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get all reviews by program id

router.get("/get", async (req, res) => {
  try {
    const { program } = req.query;
    const reviews = await Review.find({ program })
      .populate("users")
      .populate("program");

    res.status(200).json({ data: reviews, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
