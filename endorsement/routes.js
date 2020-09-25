var express = require('express');
var router = express.Router();
var auth = require('../auth');

const { 
    processEndorsementRequest,
    resolveEndorsementRequest, 
    fetchAllEndorsements, 
    fetchEndorsement 
} = require('./controllers/endorsements');



router.get(
    '/fetchEndorsement/:eId',
    auth.authenticate,
    fetchEndorsement
)


router.get(
    '/fetchAllEndorsements',
    auth.authenticate,
    fetchAllEndorsements
);

router.post(
    '/endorsement/process',
    auth.authenticate,
    processEndorsementRequest
    );

router.patch(
    '/endorsement/resolve',
     auth.authenticate,
     resolveEndorsementRequest
     );

module.exports = router;