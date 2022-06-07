const pool = require("../lib/db");

const queryAdminByOrganization = async function (organization) {
    try {
        const { rows } = await pool.query(
            `
        SELECT *
        FROM users
        JOIN organizations
        ON users.organization_id = organizations.id
        WHERE organizations.name = $1 AND permission = 'admin';`,
            [organization]
        );
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const queryMembersByOrganizationId = async function (organizationId) {
    try {
        const { rows } = await pool.query(`
        SELECT * 
        FROM users
        WHERE permission = 'member' AND organization_id = $1;`, [organizationId]);
        return rows;
    } catch (error) {
        throw error;
    }
}

const queryUsersByOrganizationId = async function (organizationId) {
    try {
        const { rows } = await pool.query(`
        SELECT * 
        FROM users
        WHERE permission = 'user' AND organization_id = $1;`, [organizationId]);
        return rows;
    } catch (error) {
        throw error;
    }
}

const insertUser = async function (
    username,
    organization,
    email,
    password,
    permission = "user"
) {
    let organization_id;
    try {
        //* Check if organization already exists based on name.
        const { rows } = await pool.query(
            `
        SELECT id FROM organizations WHERE name = $1`,
            [organization]
        );
        if (rows.length !== 0) {
            organization_id = rows[0]["id"];
        }
        //* If organization not in the db yet, insert the organization.
        if (!rows || rows.length === 0) {
            try {
                let { rows } = await pool.query(
                    `
                        INSERT INTO organizations (name)
                        VALUES ($1) RETURNING *;`,
                    [organization]
                );
                organization_id = rows[0]["id"];
            } catch (error) {
                throw error;
            }
        }
    } catch (error) {
        throw error;
    }
    //* Now we habe orgganization_id, we can insert user.
    try {
        await pool.query(
            `
        INSERT INTO users (name, email, password, organization_id, permission)
        VALUES ($1,$2,$3,$4,$5);`,
            [username, email, password, organization_id, permission]
        );
    } catch (error) {
        throw error;
    }
};

const queryUserInfoByEmail = async function (email) {
    try {
        const { rows } = await pool.query(
            `
        SELECT *
        FROM users
        WHERE email = $1`,
            [email]
        );
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const queryWebIdByURL = async function (websiteURL) {
    try {
        const { rows } = await pool.query(
            `
        SELECT *
        FROM website_url_details
        WHERE url = $1
        `,
            [websiteURL]
        );
        console.log("In queryWebIdByURL webId ARR is ", rows);
        if (rows.length !== 0) {
            return rows[0]["id"];
        } else return;
    } catch (error) {
        throw error;
    }
};

const insertWebURL = async function (websiteURL, webType) {
    try {
        const { rows } = await pool.query(
            `
        INSERT INTO website_url_details (url, website_type)
        VALUES ($1, $2) RETURNING *;`,
            [websiteURL, webType]
        );
        console.log("In insertWebUrl webId is ", rows[0]["id"]);
        return rows[0]["id"];
    } catch (error) {
        throw error;
    }
};

const insertWebUserPswd = async function (
    userid,
    webid,
    username,
    generatedPassword
) {
    try {
        const { rows } = await pool.query(
            `
        INSERT INTO website_passwords (user_id, website_url_id, username,
            generated_password)
        VALUES ($1,$2,$3,$4);`,
            [userid, webid, username, generatedPassword]
        );
    } catch (error) {
        throw error["message"];
    }
};

const queryInfoByWebIdAndUserId = async function (userid, webid) {
    try {
        const { rows } = await pool.query(
            `
        SELECT website_url_details.id as website_id ,
        website_url_details.url as website_url,
        website_url_details.website_type as website_type,
        website_passwords.id AS website_password_id,
        website_passwords.username AS username,
        website_passwords.generated_password AS password,
        website_passwords.created_at AS created_at
        FROM website_url_details
        JOIN website_passwords ON website_url_details.id = website_passwords.website_url_id
        JOIN users ON website_passwords.user_id = users.id
        WHERE users.id = $1 AND website_url_details.id = $2;`,
            [userid, webid]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

const queryWebTypeByUserId = async function (userId) {
    try {
        const { rows } = await pool.query(
            `
        SELECT count(*) ,  website_url_details.website_type AS website_type
        FROM website_url_details
        JOIN website_passwords ON website_url_details.id = website_passwords.website_url_id
        JOIN users ON website_passwords.user_id = users.id
        WHERE users.id = $1
        GROUP BY website_url_details.website_type;`,
            [userId]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

const queryWebURLsByUserIdWebType = async function (userId, webtype) {
    try {
        const { rows } = await pool.query(
            `
        SELECT DISTINCT(website_url_details.url) AS url,
        website_url_details.id as id
        FROM website_url_details
        JOIN website_passwords ON website_url_details.id = website_passwords.website_url_id
        JOIN users ON website_passwords.user_id = users.id
        WHERE users.id = $1 AND website_url_details.website_type = $2
        `,
            [userId, webtype]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

const alterWebUserPswd = async function (newPassword, website_password_id, user_id) {
    try {
        const {rows} = await pool.query(
            `UPDATE website_passwords SET generated_password =$1
            WHERE id = $2 AND user_id = $3 RETURNING *;`,
            [newPassword, website_password_id, user_id]);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    queryAdminByOrganization,
    queryMembersByOrganizationId,
    queryUsersByOrganizationId,
    insertUser,
    queryUserInfoByEmail,
    queryWebIdByURL,
    insertWebURL,
    insertWebUserPswd,
    queryInfoByWebIdAndUserId,
    queryWebTypeByUserId,
    queryWebURLsByUserIdWebType,
    alterWebUserPswd,
};
