const Promise = require('bluebird');

const pool = require('../../connections/db'); 

exports.insertIntoPeople_onboarding = async(data)=> {
    
try {
    const insertQuery = `insert into people_onboarding (
        EMP_ID,
        DOB,
        AGE,
        GENDER,
        EMAIL,
        PHONE
        )
        values (? ? ? ? ? ?);`
       return await Promise.map(data, function(d) {
            return pool.query(insertQuery, [d.emp_id, d.dob, d.age, d.gender, d.email, d.phone])
        });
} catch (error) {
    throw 'data insertion unsucessfull';
}
}

