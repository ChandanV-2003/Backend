const mongoose = require('mongoose');
const { Schema , model} = mongoose;
const userSchema = new Schema ({
    username: String,
    email: String,
    password: String , // password@
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'moderator', 'user']
    }
}, {timestamps: true});

const User = model('User', userSchema);



module.exports = User;

