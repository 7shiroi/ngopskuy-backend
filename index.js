const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { PORT, APP_PORT } = process.env;

const app = express();
const options = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(express.urlencoded({ extended: true }));
app.use(cors(options));
app.use(require('./src/routes'));

app.listen(PORT || APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT || APP_PORT}`);
});
