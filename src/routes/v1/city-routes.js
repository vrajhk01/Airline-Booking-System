const express = require("express");
const router = express.Router();
const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

router
  .route("/")
  .post(CityMiddlewares.validateCreateRequest, CityController.createCity)
  .get(CityController.getCities);

router
  .route("/:id")
  .get(CityController.getCity)
  .patch(CityController.updateCity)
  .delete(CityController.deleteCity);

module.exports = router;
