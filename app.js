const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const config = require('./config');

const { PORT } = config;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/switch'));

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

module.exports = app;
