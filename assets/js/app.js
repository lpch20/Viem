// const bodyParser = require('body-parser');
// const twilio = require('twilio');
// const express = require('express');

// const app = express();
// app.use(bodyParser.json());

// // Endpoint para enviar el token al número de celular
// app.post('/enviar-token', (req, res) => {
//   const accountSid = 'AC07e05daf83d07163fa24797fc1f5b9ee'; // Reemplazar con tu Account SID de Twilio
//   const authToken = '[AuthToken]'; // Reemplazar con tu Auth Token de Twilio
//   const client = twilio(accountSid, authToken);

//   const { celular } = req.body;

//   client.verify
//     .services('AC07e05daf83d07163fa24797fc1f5b9ee') // Reemplazar con tu Service SID de Twilio Verify
//     .verifications.create({ to: celular, channel: 'sms' })
//     .then(verification => {
//       console.log(verification.status);
//       res.sendStatus(200);
//     })
//     .catch(error => {
//       console.error(error);
//       res.sendStatus(500);
//     });
// });

// // Iniciar el servidor
// app.listen(3000, () => {
//   console.log('Servidor escuchando en el puerto 3000');
// });