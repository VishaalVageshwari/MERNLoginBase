const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// CORS middleware
app.use(cors());

// Body-Parser middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB is connect...'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server is up and running on port ${port}!`));
