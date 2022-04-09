
/* Models */
import City from "../models/cityModel.js";

class CitiesService {

  static async getCities() {
    /* this services gets all the cities from the database */

    let cities = await City.find({}).select("-__v -createdAt -updatedAt");

    return cities;
  }


  static async getAllCityIDs() {
    /* this services gets all the city IDs from the database */

    let cities = await City.find({}).select("_id");

    let cityIDs = [];

    for(let city of cities) {
      cityIDs.push(city._id.toString());
    }

    return cityIDs;
  }

}


export default CitiesService;