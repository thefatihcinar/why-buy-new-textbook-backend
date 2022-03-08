import express from 'express'

const router = express.Router();

function getMyAge(request, response){
  response.send("24");
}


router.route('/').get(getMyAge);


export default router;