const express = require('express');
const logger = require('morgan');

require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/form'));
app.use('/api', require('./routes/ddpo'));

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

module.exports = app;
