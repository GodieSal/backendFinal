const mongoose = require('mongoose');
const uniqueRandom = require('unique-random');

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

function generateUniqueCode() {
  const rand = uniqueRandom(1000, 9999);
  return `TICKET-${rand()}`;
}

ticketSchema.pre('save', function (next) {
  if (!this.code) {
    this.code = generateUniqueCode();
  }
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
