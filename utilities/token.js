import jwt from 'jsonwebtoken'

class Token {

  static generateBearerToken(userID) {
    /* this function creates new Bearer JSON Web Token 
       with the payload containing the user id */
    
    return jwt.sign( 
      { id: userID }, 
      process.env.JWT_SECRET, 
      { expiresIn: '10d' } );
  }
}

export default Token;