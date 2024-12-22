const express = require('express');
const cors = require('cors');
const helloRoutes = require('./routes/hello.routes');

const app = express();

app.use(cors());
app.use('/api', helloRoutes);

module.exports = app; 