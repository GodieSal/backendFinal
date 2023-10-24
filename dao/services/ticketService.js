const Ticket = require('./models/ticket');

class TicketService {
  static async createTicket(cart, user) {
    const ticketData = {
      code: generateUniqueTicketCode(), 
      purchase_datetime: new Date(),
      amount: calculateTotalAmount(cart), 
      purchaser: user._id, 
    };

    const ticket = new Ticket(ticketData);
    await ticket.save();
    await updateProductStock(cart);

    return ticket;
  }
}

function generateUniqueTicketCode() {
}

function calculateTotalAmount(cart) {
}

function updateProductStock(cart) {
}

module.exports = TicketService;
