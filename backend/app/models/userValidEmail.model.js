const mongoose = require('mongoose');

const userValidEmail = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, unique: true },
    token: String
}, {
    timestamps: true
});
userValidEmail.index({ createdAt: 1 }, { expireAfterSeconds: 500 });

module.exports = mongoose.model('UserValidEmail', userValidEmail);