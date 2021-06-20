const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  credentialsId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  private: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: true
  },


});
export default mongoose.model('Client', schema);
