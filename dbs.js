const mongoose = require('mongoose');
const config = require('./config');

const { DB_CONNECTION_STRING } = config;

const collatorDb = mongoose.createConnection(
  DB_CONNECTION_STRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.error(err);
      throw (err);
    }
    console.log('Connected to Collator MongoDB');
  },
);

module.exports = { collatorDb };
