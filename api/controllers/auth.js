const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport')


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
                let user = new User({
                    // _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: User.hashPasssword(req.body.password)
                });
                user.save()
                    .then(user => {
                        console.log(user)
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

//login using jwt 
// exports.loginUser = (req, res) => {
//     User.find({ email: req.body.email })
//         .exec()
//         .then(user => {
//             if (user.length < 1) {
//                 return res.status(401).json({ error: `Auth failed` });
//             } else {
//                 bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//                     if (err) {
//                         return res.status(401).json({ error: `Auth failed` });
//                     } else {
//                         const token = jwt.sign(
//                             {
//                                 //payload
//                                 email: user[0].email,
//                                 _id: user[0].id,
//                                 name: user[0].name
//                             },
//                             process.env.JWT_KEY, //secret key
//                             {
//                                 expiresIn: "90d"
//                             }
//                         );
//                         return res.status(200).json({
//                             message: `Authentication Successfull`,
//                             token: token
//                         });
//                     }
//                 });
//             }
//         })
//         .catch(err => {
//             return res.status(500).json({ error: err });
//         });
// };

// using passport
exports.loginUser = (req, res,next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); } // info is defined in passport config
        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json({ message: 'Login Success' });
        });
    })(req, res, next);
}



