const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Semana OmniStack #11');
});

app.listen(31912);