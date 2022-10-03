const dbSetup = require('./db/db-setup')

const express = require('express');
const router = require('./api');

const app = express();
app.use(express.json)

dbSetup();

app.use(router);

app.listen('3000', () => {
   console.log('flowers server is running');
})