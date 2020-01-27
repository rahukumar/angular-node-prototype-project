const post = require('../models/table.model');

exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty",
            body: req.body
        });
    }
}