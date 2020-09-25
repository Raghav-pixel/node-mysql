const pool = require('../../connections/db');

const findByCredentials = (email, password)=> {
    const query = 'Select users.id, users.name, users.email from users left join permissions on users.permission = permissions.id where users.email=? and users.password=?;';
   return pool.query(query, [email, password], (err, results, fields)=>{
    if(err){
        throw err;
    }
    return results;
   });
}

module.exports = findByCredentials;