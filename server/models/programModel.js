const mongoose = require("mongoose");
// programs: name initial description school link application length total-tuition rating

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    initial: {
      type: String,
      required: true,
    },
    schoolOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schools",
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    totalTuition: {
      type: Number,
      required: true,
    },

    isSTEM: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    /**
     * Requirements
     * add or update in tab 2
     */

    // 0-120
    toefl: {
      type: String,
      required: false,
    },
    //0-9
    ielts: {
      type: String,
      required: false,
    },
    //other language
    otherTests: {
      type: String,
      required: false,
    },

    gre: {
      type: String,
      required: false,
    },
    portfolio: {
      type: String,
      required: false,
    },
    gpa: {
      type: String,
      required: false,
    },
    classSize: {
      type: Number,
      required: false,
    },
    deadline: {
      type: Date,
      required: false,
    },
    otherRequirements: {
      type: String,
      required: false,
    },

    // rank by student ratings
    rankingByStudents: {
      type: Number,
      required: false,
    },
    difficulty: {
      type: Number,
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

module.exports = mongoose.model("programs", programSchema);
