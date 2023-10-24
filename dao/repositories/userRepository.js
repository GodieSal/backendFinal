const UserDAO = require('./userDAO');

class userRepository {
  async createUser(userData) {
    try {
      return await UserDAO.createUser(userData);
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      return await UserDAO.getUserById(userId);
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await UserDAO.getUserByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, updatedData) {
    try {
      return await UserDAO.updateUser(userId, updatedData);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      return await UserDAO.deleteUser(userId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new userRepository();
