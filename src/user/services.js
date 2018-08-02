var User = require("./model").User
var jwt = require('jsonwebtoken')
var conf = require("../../config")



exports.addUser = function (user, next) {
    
    
    // Need to store user costCenter for filteration uses through REQ.
    // Below needed only in the case of TYPE CLIENT.
    if (user.type == 'client') {
            partnerServices.getOrgCostCenter(user.organization, function(err, partner) {
                

                var cc = {} 
                cc = partner.costCenter
                if (err) {
                    return next(err)
                }
                
               var newUser = new User({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email.toLowerCase(),
                    type: user.type, 
                    password: user.password,
                    organization: user.organization,
                    costCenter: cc
                })
              
            
                newUser.save(function(err, data) {
                   if (err) {
                        return next(err, data) 
                    }
                    
                    return next(null, data); // Cant set headers after they are sent.
                });
                
            })
    }
    
    else  {
        
          var newUser = new User({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email.toLowerCase(),
                type: user.type, 
                password: user.password,
                organization: user.organization,
                costCenter: user.costCenter
            })
   
        newUser.save(function(err, data) {
            if (err) {
                return next(err, data) 
            }
            
            next(null, data);
        });
    }

    

}


exports.findUser = function(email, next) {
    User.findOne({email: email.toLowerCase()}).populate('organization').exec(function(err, user) {
        next(err, user)
    })
}

exports.getUserList =function(id, next) {
    var sm ={}
    if (id) sm = {_id: id}
    User.find(sm).populate('organization').exec(function(err, users) {
        next(err, users)
    })
}


exports.getUserListSm =function(req, next) {

    var sm = req.body;
    console.log(req.user)
    if (req.user.user.type == "agent") sm["costCenter"] = req.user.user.costCenter
    console.log(sm)
    User.find(sm).exec(function(err, users) {
        next(err, users)
    })
}

exports.getTocken = function(body, next) {
    User.findOne({email: body.username.toLowerCase()}, function(err, user) {
          if (err) {
                return next(err)
            }
            
            if(!user || user.password != body.password){
                return next(null, null)
            }
            
            var payload = {
                id: user.email
            }
            
            var token = jwt.sign(payload, conf.jwtSecret, {expiresIn: '5m'})
            
            
            return next(null, {
                token: token,
                firstName: user.firstName,
                lastName: user.lastName,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    type: user.type
                }
            })
    })
}


exports.getMailListForOrg = function(sm, next) {
    var result = []
    User.find({$or: [{$and:[{organization: sm.organization}, {type: "client"}]}, {$and: [{costCenter: sm.costCenter}, {type: "agent"}] }]}).exec(function(err, users){ // OR operator dangerous
        if (err) {
            console.log(err)
            return next(err, null)
        }
        
        next(null, users)
    })
}

