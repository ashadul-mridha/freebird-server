const mongoose = require('mongoose');

const aboutmeSchema = mongoose.Schema(
    {
        title: {
            type : String,
            required : true,
        },
        desc: {
            type : String,
        },
        image: {
            type : String,
            required : true,
        },
        fb_link: {
            type : String,
        },
        instagram_link: {
            type : String,
        },
        twitter_link: {
            type : String,
        },
        youtube_link: {
            type : String,
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

const AboutMe = mongoose.model('AboutMe', aboutmeSchema);

module.exports = AboutMe;