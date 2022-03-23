import conditions from '../data/conditions.js';

class ConditionsService {

  static getConditions() {
    /* this services gets all the conditions from the static conditions file */

    return conditions;
  }
}

class ConditionsValidatorService {
  static isValidCondition(condition){
    /* this service checks whether a given condition is a valid condition or not */
    
    if(!condition)
      return false;
    
    return conditions.includes(condition);
  }
}

export default ConditionsService;