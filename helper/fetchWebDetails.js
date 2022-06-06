const { queryWebTypeByUserId } = require('./queries');

const fetchWebTypes = async function (userId) {
    try {
        const result = await queryWebTypeByUserId(userId);
        return result;
    } catch (error) {
        throw 'problem in fetch web types '+error['message'];
    }
}

module.exports = {
    fetchWebTypes,
}