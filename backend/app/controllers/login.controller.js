const user = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const _secret = require('../../config/database.config');

// Create and Save a new Note
exports.addUser = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.email) {
        if (!req.body.username) {
            return res.status(400).send({
                message: "Note content can not be empty",
                body: req.body
            });
        } else {
            return res.status(400).send({
                message: "password can not be empty",
                body: req.body
            });
        }
        // } else if (user.validateEmail(req.body.password)) {
    }
    const userModel = new user({
        username: req.body.username,
        email: req.body.email
    });

    if (userModel.validateEmail(req.body.email)) {
        userModel.setPassword(req.body.password);

        // Save Note in the database
        userModel.save()
            .then(data => {
                console.log('successfully signed up.')
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while trying to login."
                });
            });
    } else {
        return res.status(400).send({
            message: "email format is not correct!",
            body: req.body
        });
    }

};

exports.findAll = (req, res) => {
    user.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single user with a id
exports.findOne = (req, res) => {
    user.findOne({ username: req.body.username})
        .then(userData => {
            if (!userData || userData.length === 0) {
                return res.status(404).send({
                    message: "user not found with name " + req.body.username
                });
            } else {
                if (userData.validatePassword(req.body.password)) {
                    let token = jwt.sign({ username: req.body.username },
                        _secret.secret,
                        {
                            expiresIn: '3h' // expires in 24 hours
                        }
                    )
                    let data = {
                        token: token,
                        res: user,
                        msg: 'Authentication successfull'
                    }
                    res.send(data);
                } else {
                    return res.status(400).send({
                        msg: 'Wrong Password'
                    })
                }
            }

        }).catch(err => {
            return res.status(500).send({
                message: "Error retrieving user with name " + req.body.username
            });
        });
};

exports.getUserData = (req, res) => {
    user.find({ username: req.params.username })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with name " + req.params.username
                });
            }
            res.send(user);
        }).catch(err => {
            // if (err.kind === 'ObjectId') {
            //     return res.status(404).send({
            //         message: "Note not found with id " + req.params.noteId
            //     });
            // }
            return res.status(500).send({
                message: "Error retrieving user with name" + req.params.username
            });
        });
};

