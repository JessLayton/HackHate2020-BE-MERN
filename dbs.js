const mongoose = require('mongoose');
const fileSystem = require('fs');

const { MONGODB_COLLATOR_CONNECTION_STRING } = process.env;
const credentials = fileSystem.readFile('MongoDB_AdminUser_X509.pem', (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
});

const collatorDb = mongoose.createConnection(
    MONGODB_COLLATOR_CONNECTION_STRING,
    {
        sslCert: credentials,
        sslKey: credentials,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    },
    (err) => {
        if (err) {
            console.error(err);
            throw (err);
        }
        console.log('Connected to Collator MongoDB');
    }
);

module.exports = { collatorDb };