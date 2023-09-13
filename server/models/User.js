const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Interest = require('./Interest');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    // interests: [Interest.schema]

});


userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')){
        const salty = 10;
        this.password = await bcrypt.hash(this.password, salty);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);

module.exports = User;