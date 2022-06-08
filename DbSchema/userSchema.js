const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type : String,
    },
    lname: {
        type : String,
    },
    email: {
        type : String,
    },
    password: {
        type : String,
    },
    date: {
        type :Date,
        default :Date.now(),
    },
});
const user_details = new mongoose.model('user_details', userSchema);
module.exports = user_details;