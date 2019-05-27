var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({ email: {type: String, required: true}, 
                                    pass: {type: String, required: true}
                                   }, {collection: 'user'});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.pass);
}
module.exports = mongoose.model('user', userSchema);
