const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");

router
  .route("/")
  .post(
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane
  )
  .get(AirplaneController.getAirplanes);

module.exports = router;
