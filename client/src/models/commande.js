const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant', // or restaurateur
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  state: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});
export default mongoose.model('Commande', schema);
