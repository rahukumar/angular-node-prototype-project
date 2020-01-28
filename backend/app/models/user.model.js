const mongoose = require('mongoose');
var crypto = require('crypto');

const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    hash: String,
    salt: String,
    email: { type: String, unique: true },
    isVerified: { type: Boolean, default: false }
}, {
    timestamps: true
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

userSchema.methods.validatePassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    console.log('the has generated', hash);
    return this.hash === hash;
}

userSchema.methods.validateEmail = function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}

module.exports = mongoose.model('User', userSchema);