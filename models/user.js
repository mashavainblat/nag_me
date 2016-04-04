var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
var List = require("./list.js");

var userSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {type: String, unique: true},
	password: {type: String, required: true},
	phoneNumber: {type: Number, required: true},
	list: [List.schema],
	created: {type: Date, default: Date.now},
	isAdmin: {type: Boolean, default: false}
})

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


var User = mongoose.model("User", userSchema);
module.exports = User;