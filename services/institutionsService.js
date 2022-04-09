
/* Models */
import Institution from "../models/institutionModel.js";

class InstitutionsService {

  static async getInstitutions() {
    /* this services gets all the institutions from the database */

    let institutions = await Institution.find({}).select("-__v -createdAt -updatedAt");

    return institutions;
  }

  static async getAllInstitutionIDs() {
    /* this services gets all the institution IDs from the database */

    let institutions = await Institution.find({}).select("_id");

    let institutionIDs = [];

    for(let institution of institutions) {
      institutionIDs.push(institution._id.toString());
    }

    return institutionIDs;
  }
}

export default InstitutionsService;