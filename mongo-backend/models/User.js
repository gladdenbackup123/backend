const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age:Number,
    city:String
});

module.exports = mongoose.model('User',userSchema)