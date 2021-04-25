const mongoose = require('mongoose');

const collatorDb = mongoose.createConnection(
  process.env.MONGODB_COLLATOR_CONNECTION_STRING,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.error(err);
      throw (err);
    }
    console.log('Connected to Collator MongoDB');
  },
);

module.exports = { collatorDb };
