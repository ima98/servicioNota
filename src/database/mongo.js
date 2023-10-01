const {MongoMemoryServer} = require('mongodb-memory-server');
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
//require("dotenv").config();
let database = null;
const mongod = new MongoMemoryServer();



async function startDatabase() {
    const mongod = await MongoMemoryServer.create(); // Crea una instancia de MongoMemoryServer

    // Obtén la URL de conexión a la base de datos en memoria
    const mongoUri = mongod.getUri();
    console.log('MongoDB en memoria URI:', mongoUri);
  
    // Conecta a la base de datos en memoria
    const connection = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    database = connection.db();
  }

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};