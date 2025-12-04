const authorizeUser = (permittedRoles) => {
    return (req, resizeBy, next) => {
        if (permittedRoles.includes(req.role)) {
            next();
        } else {
            resizeBy.status(403).json({ error: 'Acesss Denied.'});
        }
    }
}

module.exports = authorizeUser;