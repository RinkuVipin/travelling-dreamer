const express = require("express");
const { check } = require("express-validator");

const PlacesController = require("../controllers/places-controller");
const authToken = require("../middlewares/auth-token");
const fileUpload = require("../middlewares/file-upload");

const router = express.Router();

router.get("/:plId", PlacesController.getPlaceById);

router.get("/user/:usId", PlacesController.getPlacesByUserId);

router.use(authToken);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 8 }),
    check("address").not().isEmpty(),
  ],
  PlacesController.createNewPlace
);

router.patch(
  "/:plId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 8 })],
  PlacesController.updatePlace
);

router.delete("/:plId", PlacesController.deletePlace);

module.exports = router;
