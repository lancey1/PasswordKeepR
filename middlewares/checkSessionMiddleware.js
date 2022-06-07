const { queryUserInfoByEmail } = require('../helper/queries');

//? set cookies/sessionCookie into res.locals
const checkRequestSessionInfo = async (req, res, next) => {
    if (req.session['email']) {
        try {
            //* Fetch user info if user had a email cookie.
            let user = await queryUserInfoByEmail(req.session['email']);
            // console.log('in check session middleware ', user);
            res.locals.user = user;
            res.locals.isAdmin = (user.permission === 'admin' ? true : false);
            res.locals.isAuth = true;
            // console.log(res.locals.isAdmin,' ', res.locals.isAuth);
        } catch (error) {
            throw error['message'];
        }
    }
    next();
};

module.exports = checkRequestSessionInfo;