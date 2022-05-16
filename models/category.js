const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true,
        },
        slug: {
            type : String,
            required : true,
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
        image: {
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

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;