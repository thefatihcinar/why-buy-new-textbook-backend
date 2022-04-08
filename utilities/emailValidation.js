import { isNotEmpty } from './emptiness.js'

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


function emailValidator(email){
  /* this function valides whether the given email is valid or not */

  if(isNotEmpty(email)){
    // if at least an email is provided
    if(emailRegexp.test(email)){
      // the email is valid
      return true;
    }
    else{
      // not valid email
      return false;
    }
  }
  else{
    // an empty email is not valid
    return false;
  }
}


export default emailValidator;