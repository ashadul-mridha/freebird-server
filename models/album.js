const mongoose = require('mongoose');

const albumSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true,
        },
        slug: {
            type : String,
            required : true,
        },
        cat_id : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref: 'Category'
        },
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

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;