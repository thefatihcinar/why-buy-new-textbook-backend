import express from 'express'

const router = express.Router();

function giris(request, response){

    response.send("hello bengu")
}

// post '/users/login' => Hosgeldin Bengu

router.route("/login").post(giris);

export default router;
