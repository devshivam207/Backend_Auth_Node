const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    userid:{
        type: String,
        unique: true,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        require: true,
    },
    joindate:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("User",userschema);