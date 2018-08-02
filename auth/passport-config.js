module.exports = function() {
    var passport = require("passport")
    var passportJwt = require("passport-jwt")
    var userService = require("../src/user/services")
    var config = require('../config')
    
    var extractJwt = passportJwt.ExtractJwt
    
    var options = {
        secretOrKey: config.jwtSecret,
        jwtFromRequest: extractJwt.fromAuthHeader(),
        ignoreExpiration: true  // For dev
    }
    
    passport.use(new passportJwt.Strategy(options, function(payload, next) {
        userService.findUser(payload.id, function(err, user) {
            if (err) {
                return next(err)
            }
            
            if(!user){
                return next(null, null)
            }
            
            user.password= null;
            
            return next(null, {
                id: user.email,
                user: user
            })
        });
    }));
    
     passport.serializeUser(function(user, next) {
        next(null, user.email)
    })
    
    
    passport.deserializeUser(function(email, next) {
        userService.findUser(email, function(err, user) {
            next(err, user);
        })
    } )
}