'use strict';

const mongoose = require('mongoose');
const db_url = process.env.DATABASE_URL

mongoose.connect( db_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to MongoDB database!')
});

module.exports = mongoose;
