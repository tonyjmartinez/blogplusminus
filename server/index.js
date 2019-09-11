const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http');
const Auth = require('./controllers/authentication');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema.js');

// const MONGO_URI =
//   "mongodb://tonyjmartinez:" +
//   process.env.MONGOPWD +
//   "@ds117540.mlab.com:17540/blogplusminus";
const MONGO_URI = 'mongodb://localhost:27017/blogplusminus';
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB'))
  .on('error', error => console.log(error));

app.use(morgan('combined'));
app.use(cors());

app.use(
  '/graphql',
  bodyParser.json(),
  Auth.jwtAuth,
  expressGraphQL(req => ({
    schema,
    graphiql: true,
    context: {
      user: req.user
    }
  }))
);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
