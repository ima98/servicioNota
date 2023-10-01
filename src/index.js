const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertNota, getNotas, deleteNota} = require('./database/notas');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));



app.get('/notas', async (req, res) => {
  res.send(await getNotas());
});

app.delete('delete/:num', async (req, res) => {
  const num=req.params.num;
  await deleteNota(num);
  res.send({ message: 'Ad removed.' });

    //const contenido = req.body;
    //console.log(contenido.id)
    //await deleteNota(contenido.id)
    //res.send({ message: 'Nota borrada.' });
});

app.post('/newNota', async (req, res) => {
    const contenido = req.body;
    await insertNota({texto: contenido.texto, num: contenido.num});
    res.send({ message: 'Nota guardada.' });
  });

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  // start the server
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});