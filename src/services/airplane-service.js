const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRespository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRespository.create(data);
    return airplane;
  } catch (error) {
    if (error.name) {
      let explanation = [];
      error.errors.forEach((err) => explanation.push(err.message));
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRespository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Some error occured while fetching data of airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRespository.get(id);
    return airplane;
  } catch (error) {
    if (StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Some error occured while fetching details of airplane",
      StatusCodes.BAD_REQUEST
    );
  }
}

async function updateAirplane(id, data) {
  try {
    const airplane = await airplaneRespository.update(id, data);
    return airplane;
  } catch (error) {
    if (StatusCodes.NOT_FOUND) {
      throw new AppError("This airplane does not exist", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Some error occured while updating airplane",
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  updateAirplane,
};
