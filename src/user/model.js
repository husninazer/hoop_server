var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userService = require("./services")

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    organization: {type: Schema.Types.ObjectId, ref: 'Partner'},
    type: String, // admin / appadmin / agent / client
    costCenter: {type: Schema.Types.ObjectId, ref: 'CostCenter'},
    status: String,
    updated: Date,
    created: {type: Date, default: Date.now}
});

userSchema.path('email').validate(function(value, next) {
    userService.findUser(value, function(err, user) {
        if (err) {
            console.log(err);
            return next(false)
        }
        
        next(!user)
    });
}, 'The email is already in use.')

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};