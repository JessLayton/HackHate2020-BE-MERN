const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/form'));
app.use('/api', require('./routes/ddpo'));
app.use('/api/dash', require('./routes/reportingDetails'));

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

module.exports = app;
