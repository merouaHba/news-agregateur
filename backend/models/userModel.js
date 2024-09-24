const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
    },
    googleId: {
        type: String
    },
    readArticles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    favouriteArticles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }]

})

UserSchema.index({ firstname :'text',lastname:'text'})

UserSchema.pre('save', async function () {

    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})




    /**
     * Compares a given password with the user's stored password
     * @function
     * @param {string} canditatePassword - The password to compare
     * @returns {Promise<boolean>} - true if the passwords match, false if not
     */

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)