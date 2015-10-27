var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userService = require("../services/user-service");

var stringValidationObjMake = function(fieldType, formKey){
    var validationObject = {type: fieldType, required: "please enter your " + formKey};
    return validationObject;
};

var userSchema = new Schema({
    firstName: stringValidationObjMake('String','first name'),
    lastName: stringValidationObjMake('String','last name'),
    roomNumber: {type: Number, required: "please enter your room number", min: [100, 'Not a valid room number'] },
    email: stringValidationObjMake('String','e-mail'),
    password: stringValidationObjMake('String','password'),
    created: {type: Date, default: Date.now()}
});

userSchema.path('email').validate(function(value, next){
    userService.findUser(value, function(err, user){
        if(err){
            console.log(err);
            return next(false);
        }
        next(!user);
    });
}, 'That email is already in use');

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};