const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt");

const userProfileSchema = new Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    imgurl: String,
    userId: mongoose.Schema.Types.ObjectId

})

module.exports = mongoose.model('user_profile', userProfileSchema)