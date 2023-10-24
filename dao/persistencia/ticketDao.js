const mongoose = require('mongoose');
const Ticket = require('../models/ticket');

class TicketDAO {
  async createTicket(ticketData) {
    try {
      const ticket = new Ticket(ticketData);
      await ticket.save();
      return ticket;
    } catch (error) {
      throw error;
    }
  }
  async getTicketById(ticketId) {
    try {
      const ticket = await Ticket.findById(ticketId);
      return ticket;
    } catch (error) {
      throw error;
    }
  }
  async getAllTickets() {
    try {
      const tickets = await Ticket.find();
      return tickets;
    } catch (error) {
      throw error;
    }
  }
  async deleteTicket(ticketId) {
    try {
      await Ticket.findByIdAndDelete(ticketId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TicketDAO();
