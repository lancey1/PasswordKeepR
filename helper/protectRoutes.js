const protectAdminRoutes = function (req, res, next) {
    if (!res.locals.isAdmin) return res.status(403).render('403');
    next();
}

const protectAuthRoutes = function (req, res, next) {
    if (!res.locals.isAuth) return res.status(401).render('401');
    next();
}

const checkUserPermission = function (req, res, next) {
    if (res.locals.isAdmin) return next();
    if (!res.locals.isMember) return res.status(403).render('403');
    next();
}

module.exports = {
    protectAdminRoutes,
    protectAuthRoutes,
    checkUserPermission,
}