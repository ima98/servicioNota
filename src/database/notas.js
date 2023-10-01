const {getDatabase} = require('./mongo');

const collectionName = 'notas';

async function insertNota(nota) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(nota);
  return insertedId;
}

async function getNotas() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteNota(num) {
    const database = await getDatabase();
    //database.collection(collectionName).deleteOne(
    //  { "num" : num }
    //);
    database.collection.deleteMany({})
      
  }

module.exports = {
  insertNota,
  getNotas,
  deleteNota
};