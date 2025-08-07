const CrudRepository = require("./crud-repository");
const { Airplane } = require("../models");

class AirRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }
}

module.exports = AirRepository;
