const express = require('express');
const app = express();



const apiUsersRoutes = require('../api/apiUsers'); 
app.use('/api', apiUsersRoutes);



app.listen(3000, () => {
  console.log('La aplicación está escuchando en el puerto 3000.');
});
