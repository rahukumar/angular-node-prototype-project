const user = require('../models/user.model.js');
const userValidEmail = require('../models/userValidEmail.model');
const jwt = require('jsonwebtoken');
const _secret = require('../../config/database.config');
var nodemailer = require('nodemailer');

// Create and Save a new Note
exports.addUser = (req, res) => {
    // Validate request
    console.log("rere",req.body)
    if (!req.body.username || !req.body.email) {
        if (!req.body.username) {
            return res.status(400).send({
                message: "username content can not be empty",
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
                let resPonse = {
                    data: data,
                    msg: 'URL has been sent to the email.Please check!'
                }
                sendUrl(resPonse)
                res.send(resPonse);
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

sendUrl = (resPonse) => {
    const userValidateEmail = new userValidEmail({
        id: resPonse.data._id,
        // otp: Math.floor((Math.random() * 9000) + 1000)
        token: jwt.sign({ username: resPonse.data.username },
            _secret.secret,
            {
                expiresIn: 60 * 5 // expires in 24 hours
            }
        )
    })
    userValidateEmail.save()
        .then(data => {
            console.log('successfully added the otp.');
            sendEmail(resPonse, data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while trying to save URL."
            });
        });
}

sendEmail = (resPonse, data) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rahulkumar230393@gmail.com',
            pass: 'hornbill59'
        }
    });
    var mailOptions = {
        from: 'rahulkumar230393@gmail.com',
        to: resPonse.data.email,
        subject: 'Verification Link',
        html: '<p>Click <a href="http://localhost:4200/login/' + data.token + '">here</a> to reset your password</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

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
            console.log('------------------',userData)
            if (!userData || userData.length === 0) {
                return res.status(404).send({
                    message: "user not found with name " + req.body.username
                });
            } else {
                if (userData.validatePassword(req.body.password)) {
                    if (!userData.isVerified) {
                        return res.status(400).send({
                            msg: 'Email is not verified'
                        })
                    }
                    let token = jwt.sign({ username: req.body.username },
                        _secret.secret,
                        {
                            expiresIn: '3h' // expires in 24 hours
                        }
                    )
                    let data = {
                        token: token,
                        user: userData,
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

exports.verifyEmail = (req, res) => {
    userValidEmail.findOne({ token: req.params.token })
        .then(userData => {
            if (!userData || userData.length === 0) {
                return res.status(404).send({
                    message: "Email verification failed"
                });
            } else {
                user.findOne({ _id: userData.id })
                    .then(user => {
                        if (user) {
                            user.isVerified = true;
                            user.save();
                            return res.status(200).send({
                                msg: 'Success',
                                res: user
                            })
                        } else {
                            return res.status(404).send({
                                message: "Email verification failed."
                            });
                        }
                    })
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

