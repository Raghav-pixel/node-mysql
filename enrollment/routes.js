var express = require('express');
var router = express.Router();
var upload = require('./controllers/upload');
var insert = require('./db/enrollment_users_db');
var auth = require('../auth');
var fs = require('fs');

const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
 
router.post('/upload', upload.upload, async(req, res)=> {

    try {

         const csvData = await upload.readUploadedFile(req.file.filename);
         
         // remove the file from file system after parsing
            await unlinkAsync(req.file.path);

            await insert.insertIntoDB(csvData);

            res.status(200).send({
                message: 'data successfully inserted into the database'
            });
    } catch (e) {
        res.status(400).send(e)
    }
});

module.exports = router;