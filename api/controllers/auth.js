const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport')



exports.register = (req, res) => {

    //check if user exist
    User.find({ email: req.body.email })
        .exec()
        .then(result => {
            if (result.length >= 1) {
                return res
                    .status(409)
                    .json({ error: `User With Email ${req.body.email} already exist` });
            } else {
                let user = new User({
                    // _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: User.hashPasssword(req.body.password),
                    avtar: req.file.path
                });

                user.save()
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
};


exports.loginUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); } // info is defined in passport config
        const token = jwt.sign({
            email: user.email,
            _id: user.id,
            name: user.name
        }, process.env.JWT_KEY, { expiresIn: "90d" });
        return res.json({ user, token });
        // req.login(user,  (err) => {
        //     if (err) { return res.status(501).json(err); }
        //     // generate a signed son web token with the contents of user object and return it in the response
        //     console.log("user",user)

        // });
    })(req, res, next);
}


