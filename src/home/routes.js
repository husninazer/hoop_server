var express = require('express');
var router = express.Router();

var vm = function (req) {
    return {
        title: 'Siyaaha',
        firstName: req.user? req.user.firstName : null,
        lastName: req.user? req.user.lastName : null
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', vm(req));
});



module.exports = router;
