const pool = require('../../connections/db'); 

exports.insertIntoDB = async(data)=> {
    
try {
    const insertQuery = `insert into people_onboarding (
        NAME,
        DOB,
        AGE,
        GENDER,
        EMAIL,
        PHONE
        )
        values ?;`
        let i = 1;
        while(i<data.length) {
           const valuesToInsert = data[i].map((t) => Object.values(t));
           pool.query(insertQuery, [valuesToInsert]);
           i++;
        }
} catch (error) {
    throw 'data insertion unsucessfull';
}
}

