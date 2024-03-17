const userRolMiddleware = (req, res, next)  => {

    try {
        if(!req.user) return res.sendStatus(401);
        if(req.user.role !== 'Admin') return res.sendStatus(403);

        next();
    } catch (err) {
        next(err)
    }
}

module.exports = userRolMiddleware;