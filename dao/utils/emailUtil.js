const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ecommerce@gmail.com', 
    pass: 'contraseñaEcommerce' 
  }
});


function sendPasswordResetEmail(to, resetLink) {
  const mailOptions = {
    from: 'ecommerce@gmail.com',
    to,
    subject: 'Restablecimiento de Contraseña',
    text: `Pulsa el siguiente enlace para restablecer tu contraseña: ${resetLink}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
}

module.exports = { sendPasswordResetEmail };
