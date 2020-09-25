const pool = require('../../connections/db');

exports.processEndorsement = async(eId)=> {
    try {
        const query = `update endorsements set status = ?, processed_date = NOW() where id =?;`
    return await pool.query(query, ['processing', eId]);
    } catch (error) {
        throw 'processing not sucessfull';
    }
    
}

exports.updateEndorsements = async({ resolution, eId }) => {
    try {
        const query = 'update endorsements set resolution_date = NOW(), status = ? where id = ?';
    return await pool.query(query, [resolution, eId]);
    } catch (error) {
        throw 'updation error';
    }
  };

exports.fetchAllEndorsementsFromDB = async({ limit, offset })=> {
    try {
        const query = `select * from endorsements limit ?, ?;`
      return await pool.query(query, [offset, limit]);
    } catch (error) {
        throw error;
    }
}

exports.fetchEndorsementFromDB = async(eId)=> {
    try {
        const query = `select 
        e.requested_date,
        e.status,
        ee.email, ee.phone
        from endorsements e left join endorsements_employees ee
        on e.id = ee.endorsement_id
        where e.id = ?;`

    return await pool.query(query, [eId]);  
    } catch (error) {
        throw error;
    }
}

exports.getDetailsFromEndorsementsTable = async(eId)=> {
    try {
        const query = `select 
        u.name as requestedBy from 
        endorsements e left join users u
        on e.user_id = u.id 
        where e.id = ?;`
        return await pool.query(query, [eId]);
    } catch (error) {
        throw error;
    }
}