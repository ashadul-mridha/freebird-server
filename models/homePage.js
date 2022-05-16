const mongoose = require('mongoose');

const homePageSchema = mongoose.Schema(
    {
        title: {
            type : String,
            required : true,
        },
        subTitle: {
            type : String,
            required : true,
        },
        desc: {
            type : String,
        },
        bgImg: {
            type : String
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

const HomePage = mongoose.model('HomePage', homePageSchema);

module.exports = HomePage;