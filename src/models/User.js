const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    mobileNumber: {
      type: Number,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // default: null,
      required: true,
    },
    countryCode: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userRole:{
      type:String,
      enum : ["Admin","Customer"],
      default:"Customer",
    },
    token:{
      type:String,
      default:"",
    },
  },
  { timestamps: true }
);

//userSchema.virtual('ID').get(function() { return this._id; });
var User = mongoose.model("User", userSchema);

module.exports = User;
