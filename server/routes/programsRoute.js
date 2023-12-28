const Program = require("../models/programModel");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

// add Program
router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await Program.create(req.body);
    res
      .status(200)
      .json({ message: "Program added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get all programs
router.get("/", async (req, res) => {
  try {
    const Programs = await Program.find()
      .populate("school")
      .populate("createdBy");
    res.status(200).json({ programs, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get program by id
router.get("/:id", async (req, res) => {
  try {
    const Programs = await Program.findById(req.params.id)
      .populate("school")
      .populate("createdBy");
    res.status(200).json({ programs, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// update program
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    await Program.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "Program updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// delete program
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.send({ message: "Program deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
