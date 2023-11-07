// Importa la biblioteca dotenv
require('dotenv').config();

// Define las configuraciones
const config = {
  mongodbURI: process.env.MONGODB_URI,
  secretKey: process.env.SECRET_KEY,
  // Agrega otras configuraciones según sea necesario
};

// Exporta la configuración
module.exports = config;
