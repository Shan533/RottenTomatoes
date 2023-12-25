const mongoose = require("mongoose");

// schools: name type country location year QS USNews link
// programs: name fullname school description link application length total-tuition rating
// application: toefl ielts gre ddl
const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    initial: {
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
    profilePic: {
      type: String,
      required: true,
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schools", schoolSchema);
