

function isEmpty(obj){
  /* this function gets an object and figures out whether it is empty object, empty array
     undefined or null. */
  
  /* if the object is undefined, signal it */
  if( obj === undefined) return true;
  /* it the object is null, signal it */
  if( obj === null) return true;
  /* it it is an empty object, signal it */
  if( Object.keys(obj).length === 0 ) return true;
  /* if it is an array, signal it */
  if( obj && obj.length === 0) return true; 

  return false;
  /* this means that this object is not empty */
}

function isNotEmpty(obj){
  /* this function gets an object and figures out whether it is empty or not */
  return !isEmpty(obj);
}


export { isEmpty, isNotEmpty };