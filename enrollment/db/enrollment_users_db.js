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
           console.log(d, "arr");
           console.log(d[3], "age");
           console.log(d[1], "emp_id")
            return pool.query(insertQuery, [d.emp_id, d.dob, d.age, d.gender, d.email, d.phone])
        });
} catch (error) {
    throw 'data insertion unsucessfull';
}
}

