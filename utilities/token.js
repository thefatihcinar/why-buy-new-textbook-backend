import jwt from 'jsonwebtoken'

class Token {

  static generateBearerToken(user) {
    /* this function creates new Bearer JSON Web Token 
       with the payload containing the user id */
    
    return jwt.sign( 
      { id: user._id,
        email: user.email,
        name: user.name, }, 
      process.env.JWT_SECRET, 
      { expiresIn: '10d' } );
  }
}

export default Token;