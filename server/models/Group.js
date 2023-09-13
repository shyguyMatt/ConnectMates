const { Schema, model } = require('mongoose');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./User');

const groupSchema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // users: [User.Schema],
    groupsize: {
        type: Number,
        min: 2,
        default: 0
    }
});

const Group = mongoose.model('Group',groupSchema);
module.exports = Group;
