const express = require('express');
const app = express();
const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://phamquocan:phamquocan112@cluster0.sbpfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
  console.log('Database connected')
})
mongoose.connection.on('error', (err) => {
  console.log('error', err)
})

app.use(express.json());

const propertyRoutes = require('./routes/property');

app.use(propertyRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000')
})