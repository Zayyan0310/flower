const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const { getSetting, updateSetting } = require("../controllers/settingController");

router.get("/", getSetting);
router.put("/", upload.single("logo"), updateSetting);

module.exports = router;
