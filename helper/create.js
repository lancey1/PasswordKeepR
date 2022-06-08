const { insertWebURL, insertWebUserPswd, queryWebIdByURL, queryWebIdByURLAndUserId } = require('./queries');

const storeInstance = async function (webURL, webType, userId, username, generatedPassword) {
    let webId;
    //? Findout if webURL was in the database already, if so, set webId.
    try {
        webId = await queryWebIdByURLAndUserId(webURL, userId);
    } catch (error) {
        throw error;
    }
    //? If no webURL found in the database, insert new, return webId then set webId.

    if (!webId) {
        try {
            webId = await insertWebURL(webURL, userId, webType);
        } catch (error) {
            throw error;
        }
    }
    console.log('In create instance, webId is ', webId);
    //* Now we have webID set. we can insert a new instance into web_user_password table
    try {
        await insertWebUserPswd(userId, webId, username, generatedPassword);
        return 'success';
    } catch (error) {
        throw error;
    }
}

module.exports = {
    storeInstance,
}