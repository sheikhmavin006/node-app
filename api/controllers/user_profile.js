const UserProfile = require("../models/user_profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.insert = (req, res) => {
    let userProfile = new UserProfile(req.body);
    userProfile.save()
        .then(user => {
            console.log({ userId: req.params.id, ...user })
            return res
                .status(201)
                .json({ _id: user._id, message: "Created Successfully" });
        })
        .catch(err => {
            return res.status(500).json({ error: err });
        });
};

exports.get = (req, res) => {
    UserProfile.findOne(req.params.id)
    .exec()
    .then(result => {
      console.log(result);
      res.json({ data:result });
    })
    .catch(err => console.log(err));
    
};


