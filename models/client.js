const mongoose = require('mongoose');

const clientSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true,
        },
        slug: {
            type : String,
            required : true,
        },
        image: {
            type : String,
            required : true,
        },
        live_link: {
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

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;