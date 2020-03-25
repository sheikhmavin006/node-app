const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt");

const userSchema= new Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    name: String,
    email: {type:String,
        required:true,
        unique:true,
        match:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    password:{type:String,required:true},
    avtar:String

})
userSchema.statics.hashPasssword = function hashPasssword(password){
    return bcrypt.hashSync(password,10)
}
userSchema.methods.isValid = function (hashPasssword){
    return bcrypt.compareSync(hashPasssword,this.password)
}
module.exports = mongoose.model('User',userSchema)