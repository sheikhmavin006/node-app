const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = (req, res) => {
    //post to collection

    //check if user exist
    User.find({ email: req.body.email })
        .exec()
        .then(result => {
            if (result.length >= 1) {
                return res
                    .status(409)
                    .json({ error: `User With Email ${req.body.email} already exist` });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        let user = new User({
                            // _id: mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(user => {

                                return res
                                    .status(201)
                                    .json({ _id: user._id, message: "Created Successfully" });
                            })
                            .catch(err => {
                                return res.status(500).json({ error: err });
                            });
                    }
                });
            }
        });
};

exports.loginUser = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({ error: `Auth failed` });
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({ error: `Auth failed` });
                    } else {
                        const token = jwt.sign(
                            {
                                //payload
                                email: user[0].email,
                                _id: user[0].id,
                                name: user[0].name
                            },
                            process.env.JWT_KEY, //secret key
                            {
                                expiresIn: "90d"
                            }
                        );
                        return res.status(200).json({
                            message: `Authentication Successfull`,
                            token: token
                        });
                    }
                });
            }
        })
        .catch(err => {
            return res.status(500).json({ error: err });
        });
};
