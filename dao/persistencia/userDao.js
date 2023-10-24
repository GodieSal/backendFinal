const mongoose = require('mongoose');
const User = require('../models/user'); 
class UserDAO {
  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(userId) {
    try {
      await User.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }
  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
  
}
module.exports = new UserDAO();
