const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const CategorySchema = new Schema(
    {
        name: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

//userSchema.virtual('ID').get(function() { return this._id; });
var Category = mongoose.model("Category", CategorySchema);

module.exports = Category;