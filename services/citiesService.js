
/* Models */
import City from "../models/cityModel.js";

class CitiesService {

  static async getCities() {
    /* this services gets all the cities from the database */

    let cities = await City.find({}).select("-__v -createdAt -updatedAt");

    return cities;
  }
}


export default CitiesService;