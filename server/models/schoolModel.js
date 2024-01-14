const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    initial: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    rankingQS: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    images: {
      type: [],
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schools", schoolSchema);
