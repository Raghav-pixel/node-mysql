const endorsements = require('../db/endorsementsDB');

const acceptedResolutionValues = ['rejected', 'approved'];

exports.fetchAllEndorsements = async(req, res)=> {
    try {
        //limit as 20
        const limit = 20;
        //page number
        const page = req.query.page;
        //offset
        const offset = (page-1)*limit;

  const result = await endorsements.fetchAllEndorsementsFromDB({
        limit,
        page,
        offset
    });
    
    res.status(200).send({ 
        data: result[0],
        message: 'sucessfully fetched all endorsements'
    });    
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.fetchEndorsement = async(req, res)=> {
    try {
       const eId = req.params.eId;

       const result = await endorsements.fetchEndorsementFromDB(eId);
       const details = await endorsements.getDetailsFromEndorsementsTable(eId);

   
        res.status(200).send({
            data: [...result[0], details[0][0]],
            message: 'sucessfully fetched endorsement'
        });
    } catch (error) {
        res.status(500).send({
            error: 'internal server error'
        });
    }
}


exports.processEndorsementRequest = async(req, res)=> {
    try {
        const eId = req.body.eId;
        const data = await endorsements.processEndorsement(eId);
        res.status(200).send({
            data,
            message: 'endorsement is proccessed'
        });   
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.resolveEndorsementRequest = async(req, res)=> {
    const { resolution, eId } = req.body;

    try {
        if(!acceptedResolutionValues.includes(resolution)){
            res.status(500).json({
                errorMessage: 'Invalid resolution value passed'
            });
            return;
        }

        if(resolution == "approved") {
            const dataArray = await endorsements.fetchPeopleEndorsements(eId);
            await endorsements.updatePeople_onboarding(dataArray); 
        }


      
    } catch (error) {
        res.status(400).send(error);
    }
}