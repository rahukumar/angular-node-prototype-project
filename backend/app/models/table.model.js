var mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    name: String,
    type: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Table', tableSchema);