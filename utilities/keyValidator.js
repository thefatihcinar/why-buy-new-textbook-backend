import { StatusCodes } from 'http-status-codes';

class KeyValidator {
  /* This class is responsible for validating the object keys
     validating keys means, whether this key must exist in the object
     or this key cannot be existing in the object
  */

  static isKeyValid(validKeys, key) {

    if( !validKeys || !key) {
      const error = new Error();
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        error.message = 'Valid keys or key must be provided.';
      throw error;
    }

    if(validKeys.includes(key)) {
      return true;
    }
    else return false;
  }

  static isKeyInvalid(validKeys, key) {

    if( !validKeys || !key) {
      const error = new Error();
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        error.message = 'Valid keys and key must be provided.';
      throw error;
    }

    return !this.isKeyValid(validKeys, key);
  }
}

export default KeyValidator;