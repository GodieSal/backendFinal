const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, 'D#6$hjP@i8s5L$'); 

    
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token no válido' });
  }
}

module.exports = authenticateJWT;
