const multer = require('multer');
var Papa = require('papaparse');
var path = require('path');
var fs = require('fs');

const filePath = path.join(__dirname, `../data_storage/csvDataFile`);

// store the file in a particular directory with a specified name
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../data_Storage'),
    filename: function(req, file, cb) {
        cb(null, "csvDataFile")
    }
});

exports.upload = multer({
    storage,
    fileFilter(req, file, cb){
        if(!file.originalname.endsWith('.csv')){
            return cb(new Error('please upload a csv file'))
        }
        cb(undefined, true)
    }
}).single('upload');

exports.readUploadedFile = ()=> {

    // Read file by returning a promise
       return new Promise((resolve, reject)=> {
           fs.readFile(filePath, {encoding: 'utf-8'}, (err, data)=> {
            if(err){
                reject('unable to read the file');
            }
         resolve(Papa.parse(data).data);
        });
    });

    // Read file synchronously
//     const data = fs.readFileSync(path.join(__dirname, `../../data/${file}`), {encoding: 'utf-8'});
// return Papa.parse(data).data;
      
    }



