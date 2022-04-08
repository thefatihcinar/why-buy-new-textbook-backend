import types from '../data/types.js';

class TypesService {

  static getTypes() {
    /* this services gets all the types from the static types file */

    return types;
  }
}

class TypesValidatorService {

  static isValidType(atype){
    /* this service checks whether a given type is a valid type or not */
    
    if(!atype)
      return false;
    
    return types.includes(atype);
  }
}

export default TypesService ;