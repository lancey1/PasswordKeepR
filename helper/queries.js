const pool = require('../lib/db');

const queryInfoByWebTypeAndUserId = async function (userid, webtype) {
    try {
        const { rows } = await pool.query(`
        SELECT website_url_details.id as website_id , 
        website_url_details.url as website_url, 
        website_url_details.website_type as website_type 
        FROM website_url_details
        JOIN website_passwords ON website_url_details.id = website_passwords.website_url_id
        JOIN users ON website_passwords.user_id = users.id
        WHERE users.id = $1 AND website_type = $2;`, [userid, webtype])
        return rows;
    } catch (error) {
        throw error['message'];
    }
};

const queryInfoByUserId = async function (userid) {
    try {
        const { rows } = await pool.query(`SELECT website_url_details.id as website_id , 
        website_url_details.url as website_url, 
        website_url_details.website_type as website_type 
        FROM website_url_details
        JOIN website_passwords ON website_url_details.id = website_passwords.website_url_id
        JOIN users ON website_passwords.user_id = users.id
        WHERE users.id = $1;`, [userid]);
        return rows;
    } catch (error) {
        throw error['message'];
    }
}

module.exports = {
    queryInfoByWebTypeAndUserId,
    queryInfoByUserId,
}