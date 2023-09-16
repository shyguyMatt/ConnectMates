const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    groupsize: {
        type: Number,
        min: 2,
        default: 0
    },
    interests: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Interest'
        }
    ]
});

const Group = model('Group',groupSchema);
module.exports = Group;
