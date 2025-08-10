const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (error.name) {
      let explanation = [];
      error.errors.forEach((err) => explanation.push(err.message));
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new City object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCities() {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch (error) {
    throw new AppError(
      "Some error occured while fetching data of cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(id) {
  try {
    const city = await cityRepository.get(id);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Some error occured while fetching details of city",
      StatusCodes.BAD_REQUEST
    );
  }
}

async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("This city does not exist", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Some error occured while updating city",
      StatusCodes.BAD_REQUEST
    );
  }
}

async function deleteCity(data) {
  try {
    const city = await cityRepository.destroy(data);
    return city;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError("This city does not exist", StatusCodes.NOT_FOUND);
    }
    throw new AppError(
      "Some error occured while updating city",
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = {
  createCity,
  getCities,
  getCity,
  updateCity,
  deleteCity,
};
