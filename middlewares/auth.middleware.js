const userRolMiddleware = (userRoles) => {

    return (req, res, next) => {
      try {

        if (!req.user) {return res.sendStatus(401).json({msg:"No user found"})};

        if (!userRoles.includes(req.user.role)) {return res.sendStatus(401).json({msg:"Role no authorized"});};

        next()

      } catch (err) {
        next(err)
      }
    }
}

module.exports = {userRolMiddleware};