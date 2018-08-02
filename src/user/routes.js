var express = require('express');
var router = express.Router();
var userService = require('./services');
var passport = require("passport")


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user-list/:id?', function(req, res, next) {
  userService.getUserList(req.params.id, function(err, users) {
      if (err) {
          return next(err)
      }
      
      res.json(users)
  })
});



router.post('/user-list', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  userService.getUserListSm(req, function(err, users) {
      if (err) {
          return next(err)
      }
      
      res.json(users)
  })
});


router.get('/user-test')


router.post('/create', function(req, res, next) {
    userService.addUser(req.body, function(err, user) {
        if (err) {
            return next(err)
        }
        res.json(user)
    })
});


router.get('/checkAuth', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    res.send({
        msg: "success",
        user: req.user
    })
});

router.post('/authenticate', function(req, res) {
   
   userService.getTocken(req.body, function(err, data) {
       if (err) {
           return err
       }
       
       
       if (!data || !data.token) {
           return res.sendStatus(401)
       }
       
       res.json({
           user: data
       })
   })
   

})




router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
