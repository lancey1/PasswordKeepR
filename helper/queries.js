const pool = require('../lib/db');

const insertUser = async function (username, organization, email, password) {
    let organization_id;
    try {
        const { rows } = await pool.query(`
        SELECT id FROM organizations WHERE name = $1`, [organization]);
        organization_id = rows[0].id;
    } catch (error) {
        throw error;
    }

    if (!organization_id) {
        try {
            let { rows } = await pool.query(`
                        INSERT INTO organizations (name) 
                        VALUES ($1) RETURNING *;`, [organization]);
            organization_id = rows[0].id;
        } catch (error) {
            throw error;
        }
    }

    console.log('in between qs', organization_id);
    try {
        await pool.query(`
        INSERT INTO users (name, email, password, organization_id) 
        VALUES ($1,$2,$3, $4);`, [username, email, password, organization_id]);
    } catch (error) {
        throw error;
    }
}

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
        console.log(rows);
        return rows;
    } catch (error) {
        throw error['message'];
    }
}

module.exports = {
    insertUser,
    queryInfoByWebTypeAndUserId,
    queryInfoByUserId,
}