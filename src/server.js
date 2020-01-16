const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')

const app = express();

const config = {
  db: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/omnistack',

    connect: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
}

mongoose.connect(config.db.url, config.db.connect, function (err) {
  if (err) throw err;
});

app.use(express.json());
app.use(routes);

app.listen(3333)
