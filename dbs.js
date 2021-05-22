const mongoose = require('mongoose');

const { MONGODB_COLLATOR_CONNECTION_STRING } = process.env;

const collatorDb = mongoose.createConnection(
  MONGODB_COLLATOR_CONNECTION_STRING,
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
