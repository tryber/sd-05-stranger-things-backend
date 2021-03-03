const express = require('express');
const cors = require('cors');

require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const UPSIDEDOWN = process.env.UPSIDEDOWN_MODE === 'true';

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);
// test
app.use(cors());

const hereIsTheUpsideDown = UPSIDEDOWN;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
