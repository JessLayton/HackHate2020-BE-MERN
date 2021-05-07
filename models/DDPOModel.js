const mongoose = require('mongoose');
const { collatorDb } = require('../dbs');

const DDPOSchema = new mongoose.Schema({
    name: {
        type: String, unique: true, minLength: 2, maxLength: 40, required: true,
    }
});

const DDPO = collatorDb.model('DDPO', DDPOSchema);

module.exports = DDPO;