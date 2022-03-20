import jwt from 'jsonwebtoken'

const generateToken = (userID) => {
    /* this function will create a JSON Web Token 
       with the payload containing the user id */
    
    return jwt.sign( { id: userID}, process.env.JWT_SECRET, { expiresIn: '10d' } );
}

export default generateToken;