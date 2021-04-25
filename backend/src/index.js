const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

app.use('/api', require('./routes/form'));
app.use('/api', require('./routes/ddpo'));


module.exports = app;
