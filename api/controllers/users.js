const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res) => {
  // fetch collection
  User.find()
    .select("name email password")  // .populate('FIELD_NAME','FIELDS TO BE POPULATED')  FIELD WITH ID OF OTHER COLLECTION TO POPULATE DATA CORROSPONDING TO THIS ID
    .exec()
    .then(result => {
      console.log(result);
      res.json({ count: result.length, data: result });
    })
    .catch(err => console.log(err));
};


exports.updateUser = (req, res) => {
  //update
  User.update({ _id: req.params.id }, { $set: req.body })
    .exec()
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => console.log(err));
};

exports.getUser = (req, res) => {
  // fetch single course. Use query for optional fields
  User.findById(req.params.id)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => console.log(err));
};

exports.deleteUser = (req, res) => {
  //delete
  User.remove({ _id: req.params.id });
};


