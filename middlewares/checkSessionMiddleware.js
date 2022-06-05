const { queryUserInfoByEmail } = require('../helper/queries');

//? set cookies/sessionCookie into res.locals
const checkRequestSessionInfo = async (req, res, next) => {
    if (req.session['email']) {
        try {
            let user = await queryUserInfoByEmail(req.session['email']);
            console.log('in check session middleware ', user);
            res.locals.user = user;
        } catch (error) {
            throw error['message'];
        }
    }
    next();
};

module.exports = checkRequestSessionInfo;