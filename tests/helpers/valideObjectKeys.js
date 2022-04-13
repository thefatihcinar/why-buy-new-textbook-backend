
import { StatusCodes } from 'http-status-codes';

/* Utilities */
import KeyValidator from '../../utilities/keyValidator.js';

function valideObjectKeys(obj, validKeys) {
  /* this function is responsible for validation the object keys
     whether the key must exist or whether the key cannot be existing */

  if (!obj || !validKeys ) {
    const error = new Error();
      error.code = StatusCodes.INTERNAL_SERVER_ERROR;
      error.message = 'The object and valid keys must be provided.';
    throw error;
  }

  /* Case 1: All Valid Keys Must Exist */
  /* Case 2: Other Keys Cannot be Existing */

  /* Check for each key, if any of it is not valid, then return false */

  for (let key in obj) {
    if (KeyValidator.isKeyInvalid(validKeys, key))
      return false;
  }

  return true;

}

export default valideObjectKeys;