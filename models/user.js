const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true,
        },
        email: {
            type : String,
            required : true,
            unique: true            
        },
        password: {
            type : String,
            required : true          
        },
        isDeleted : {
            type: String,
            enum : ["active", "inactive"],
            default: "inactive"
        },
        isActive : {
            type: String,
            enum : ["active", "inactive"],
            default: "inactive"
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;