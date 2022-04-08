
/* Models */
import Institution from "../models/institutionModel.js";

class InstitutionsService {

  static async getInstitutions() {
    /* this services gets all the institutions from the database */

    let institutions = await Institution.find({}).select("-__v -createdAt -updatedAt");

    return institutions;
  }
}

export default InstitutionsService;