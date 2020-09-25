const jwt = require('jsonwebtoken');
const findByCredentials = require('../db/user');
var bcrypt = require('bcryptjs');


const generateAuthToken = ({ id, name, email, })=>{

const tokenPayload = { id, name, email, }
// console.log({ tokenPayload }, 'tokenPayload');
    return token = jwt.sign(tokenPayload, 'secret', {expiresIn: '17days'});
}

exports.login = async(req, res)=> {
    try {
       const email = req.body.email;
       const password = bcrypt.hash(req.body.password, 7);
        const userInfo = await findByCredentials(email, password);
        
            const authToken =  generateAuthToken(userInfo[0][0]);
        // console.log(authToken);
        const AUTH_PREFIX = 'JWT'
        res.set({
            Authorization: AUTH_PREFIX + authToken,
            'Access-Control-Expose-Headers': 'Authorization'
        })
        res.status(200).send(authToken);
    } catch (e) {
        res.status(500).send({
            errorMessage: 'internal server error'
        });
    }

}
