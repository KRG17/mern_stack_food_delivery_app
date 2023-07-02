const router = require('express').Router()
const admin = require('firebase-admin')

router.get('/', (req, res) => {
    return res.send('Inside the user router')
})

// separate route for validating jwt token
router.get("/jwtVerification", async (req, res) => {
    // res.send('Jwt verification')
    if (!req.headers.authorization) {
        return res.status(500).send({ msg: 'Token Not Found' })
    }
    // getting token from the postman request
    const token = req.headers.authorization.split(" ")[1]
    // return res.status(200).send({token: token})
    // validate the token, decoding the token
    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        // if token is not valid
        if(!decodedValue){
            return res.status(500).json({ msg: 'Unauthorized access' })
        }
        // if it is valid 
        return res.status(200).json({success: true, data: decodedValue})
    }
    catch (err) {
        return res.send({ success: false, msg: `Error in extracting the token : ${err}` })
    }
})

module.exports = router