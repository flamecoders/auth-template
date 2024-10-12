// /models/Authority.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authoritySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, { timestamps: true });

// Hash password before saving to the database
authoritySchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Authority = mongoose.model('Authority', authoritySchema);
module.exports = Authority;