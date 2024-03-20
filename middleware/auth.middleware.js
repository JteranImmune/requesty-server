const userRolMiddleware = (userRoles) => {

    return (req, res, next) => {
      try {

        if (!req.user) return res.sendStatus(401)

        if (!userRoles.includes(req.user.role)) return res.sendStatus(401)

        next()

      } catch (err) {
        next(err)
      }
    }
}

// const userMiddleware = (req, res, next)  => {

//     try {

//         if(!req.user) return res.sendStatus(401);

//         next();

//     } catch (err) {
//         next(err)
//     }
// }

module.exports = {userRolMiddleware};