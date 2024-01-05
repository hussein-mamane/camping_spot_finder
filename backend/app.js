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

//const { fullName, email, username, password } = req.body;
app.post('/signup', async (req, res) => {
  try {
    const username = req.body['username'];

    // Check if the username is already taken
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      // Username exists
      return res.status(400).json({ error: 'Username is already taken.' });
    }

    // Username is available
    const newUser = new User({
      fullName: req.body['fullName'],
      email: req.body['email'],
      username: username,
      password: req.body['password'],
    });

    await newUser.save();
    res.json({ message: 'Your registration was successful!' });
  } catch (error) {
    console.error('User registration failed:', error);
    res.status(500).json({ error: 'Your registration failed, retry later.' });
  }
});


  app.post('/login', async (req, res) => {
    try {
      const username = req.body['username'];
      const password = req.body['password'];
      const user = await User.findOne({ username: username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      if (password === user.password) {
        res.json({ message: 'Your Login was successful!' });
      } else {
        res.status(401).json({ error: 'Invalid username or password.' });
      }
    } catch (error) {
      console.error('User Login failed:', error);
      res.status(500).json({ error: 'Your Login failed, check your input.' });
    }
  });
  

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
