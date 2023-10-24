function errorHandler(err, req, res, next) {
    console.error(err);
  

    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
  
  class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = {
    errorHandler,
    CustomError,
  };
  