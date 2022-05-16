const mongoose = require('mongoose');

const contactUsSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true,
        },
        email: {
            type : String,
            required : true,
        },
        subject: {
            type : String,
            required : true,
        },
        message: {
            type : String,
            required : true,
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

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;