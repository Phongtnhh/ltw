const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ""
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    lastLogin: {
        type: Date,
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true,
});

// Populate role when finding accounts
accountSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'role',
        populate: {
            path: 'permissions'
        }
    });
    next();
});

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;