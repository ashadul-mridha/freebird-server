const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
    {
        cat_id : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref: 'Category'
        },
        album_id : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref: 'Album'
        },
        caption: {
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

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;