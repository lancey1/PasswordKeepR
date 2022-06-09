const { queryUserInfoByEmail } = require('../helper/queries');

//? set cookies/sessionCookie into res.locals
const checkRequestSessionInfo = async (req, res, next) => {
    if (req.session['email']) {
        try {
            //* Fetch user info if user had a email cookie.
            let user = await queryUserInfoByEmail(req.session['email']);
            if (user) {
                res.locals.user = user;
                res.locals.isAdmin = (user.permission === 'admin' ? true : false);
                res.locals.isMember = (user.permission === 'member' ? true : false);
                res.locals.isAuth = true;
            }
        } catch (error) {
            throw error;
        }
    }
    next();
};

module.exports = checkRequestSessionInfo;