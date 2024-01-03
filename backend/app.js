const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/camping', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
  app.listen(port,"0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
  });
});


app.post('/signup', async (req, res) => {
    //const { fullName, email, username, password } = req.body;

    try {
      const newUser = new User({ 
        fullName:req.body['fullName'],
        email:req.body['email'],
        username:req.body['username'],
        password:req.body['password'] });
      await newUser.save();
      res.json({ message: 'Your registration was successful!' });
    } catch (error) {
      console.error('User registration failed:', error);
      res.status(500).json({ error: 'Your registration failed, retry later.' });
    }
  });
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
