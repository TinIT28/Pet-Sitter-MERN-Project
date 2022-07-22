const express = require("express");
const {
  getAllLostFoundPet,
  getLostFoundPetDetails,
  createLostFoundPet,
  updateLostFoundPet,
  deleteLostFoundPet,
} = require("../controllers/petController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/pets").get(getAllLostFoundPet);
router.route("/pet/new").post(isAuthenticatedUser, createLostFoundPet);
router.route("/pet/:id").get(getLostFoundPetDetails);

module.exports = router;
