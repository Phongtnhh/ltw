const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    resource: {
        type: String,
        required: true // e.g., 'news', 'users', 'banners', 'dashboard'
    },
    actions: [{
        type: String,
        enum: ['create', 'read', 'update', 'delete', 'manage']
    }],
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true,
});

const Permission = mongoose.model("Permission", permissionSchema, "permissions");

module.exports = Permission;
