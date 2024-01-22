const router = require("express").Router();
const Program = require("../models/programModel");
const School = require("../models/schoolModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const search = req.query.search || "";
    const [programs, schools] = await Promise.all([
      Program.find({
        name: {
          $regex: search,
          $options: "i",
        },
        initial: {
          $regex: search,
          $options: "i",
        },
      }),

      School.find({
        name: {
          $regex: search,
          $options: "i",
        },
        initial: {
          $regex: search,
          $options: "i",
        },
      }),
    ]);
    res.status(200).json({
      data: {
        programs: programs || [],
        schools: schools || [],
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

module.exports = router;
