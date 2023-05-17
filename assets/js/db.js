// Conexion a mongoDB

const mongoose = require('mongoose')
const DB_URI = 'mongodb://127.0.0.1:27017/Viemventura';

module.exports = ( )=> {
  
    async function connect() {
        try {
          await mongoose.connect('mongodb://127.0.0.1:27017/Viemventura', { useNewUrlParser: true });
          console.log('Conexión exitosa');
        } catch (error) {
          console.error('Error al conectarse a la base de datos:', error);
        }
      }
  

  connect();

}

// import { MongoClient } from 'mongodb';
// /*
//  * Requires the MongoDB Node.js Driver
//  * https://mongodb.github.io/node-mongodb-native
//  */
// const agg = [];
// const client = await MongoClient.connect(
//   'mongodb://localhost:27017/',
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );
// const coll = client.db('Viem').collection('Viemventura');
// const cursor = coll.aggregate(agg);
// const result = await cursor.toArray();
// await client.close();