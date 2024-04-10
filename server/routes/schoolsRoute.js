const School = require("../models/schoolModel");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

// add new school
router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await School.create(req.body);
    res.json({ message: "School added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get all schools
router.get("/", authMiddleware, async (req, res) => {
  try {
    const schools = await School.find().sort({ rankingQS: 1 });
    res.json({ data: schools, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get school by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    res.json({ data: school, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// update school
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    await School.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "School updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// delete school
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await School.findByIdAndDelete(req.params.id);
    res.json({ message: "School deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

module.exports = router;
