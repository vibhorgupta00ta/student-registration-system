const express = require("express");
const router = express.Router();

const {
    register,
    login,
    updatePassword,
    updateCourse
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.put("/update-password", authMiddleware, updatePassword);
router.put("/update-course", authMiddleware, updateCourse);

module.exports = router;