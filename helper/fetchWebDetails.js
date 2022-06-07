const { queryWebTypeByUserId, queryInfoByWebIdAndUserId, queryWebURLsByUserIdWebType } = require('./queries');

const fetchWebTypes = async function (userId) {
    try {
        const result = await queryWebTypeByUserId(userId);
        return result;
    } catch (error) {
        throw 'problem in fetch web types ' + error['message'];
    }
}

const fetchWebDetailsByWebId = async function (userId, webtype) {
    try {
        const result = await queryInfoByWebIdAndUserId(userId, webtype);
        return result;
    } catch (error) {
        throw error;
    }
}

const fetchWebURLsByType = async function (userId, webtype) {
    try {
        const result = await queryWebURLsByUserIdWebType(userId, webtype);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    fetchWebTypes,
    fetchWebDetailsByWebId,
    fetchWebURLsByType,
}