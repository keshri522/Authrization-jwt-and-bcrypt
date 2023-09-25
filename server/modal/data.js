const mongoose = require("mongoose");

const StoreData = new mongoose.Schema({
  //creating the modal or the blueprint of the documents ...

  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    reuqired: true,
  },
});

module.exports = mongoose.model("JWT", StoreData); //exporting the modal so we can easily import this modal any where in the app
// here Subscriber is the name of the collection that is created by monggose in which all the subscribrShcema is stored ..
