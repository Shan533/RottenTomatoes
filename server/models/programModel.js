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
    school: {
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
    // show by domestic currency
    totalTuition: {
      type: Number,
      required: true,
    },
    // rank by student ratings
    rankingByStudents: {
      type: Number,
      require: false,
    },
    description: {
      type: String,
      required: true,
    },
    // new Schema: application requirements
    // language, GRE, DDL (date), size, difficulty(1-5)
    applicationRequirements: {
      type: String,
      required: true,
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
