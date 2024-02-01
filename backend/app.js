const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// import { getDistance, getPreciseDistance } from 'geolib';
const geolib = require('geolib')


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
  //savedCampgrounds: [{ type: String, ref: 'Grounds' }]
  // savedCampgrounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grounds' }]
  savedCampgrounds: [{ type: String}]
});




const campSchema = new mongoose.Schema({
  place_id: String,
  name:String,
  location: {
    lat:Number,
    lng:Number
  },
  photo_reference: String,
});

const reviewSchema = new mongoose.Schema({
  campgroundId: String,
  title: String,
  comment: String,
  currentDate: String,
  rating: Number,
  userId: String,
});

const Review = mongoose.model('Reviews', reviewSchema);



const Camp = mongoose.model('Grounds', campSchema);
const Rvpark = mongoose.model('Rvs',campSchema)
const User = mongoose.model('Users',userSchema)
//Unused
function haversineDistance(lat1, lon1, lat2, lon2) {
  // Convert latitude and longitude from degrees to radians
  const toRadians = (angle) => (angle * Math.PI) / 180;
  lat1 = toRadians(lat1);
  lon1 = toRadians(lon1);
  lat2 = toRadians(lat2);
  lon2 = toRadians(lon2);

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));

  // Earth's radius in meters (mean value)
  const radiusOfEarth = 6371000;
  //distance
  const distance = radiusOfEarth * c;
  return distance;
} 

const exactDistance = (lat1, lon1, lat2, lon2)=> {
  const point1 = {
    latitude : lat1,
    longitude : lon1
  }
  const point2 = {
    latitude : lat2,
    longitude : lon2
  }
  const result = geolib.getPreciseDistance(point1, point2) 
  return result
}
app.post('/getsavedcamps', async (req, res) => {
  try {
    const { username } = req.body;
    console.log("express log", username)
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Access the array of place_ids
    const savedPlaceIds = user.savedCampgrounds;

    // Fetch campgrounds based on the saved place_ids
    const savedCampgrounds = await Camp.find({ place_id: { $in: savedPlaceIds } });
    const savedRvs = await Rvpark.find({ place_id: { $in: savedPlaceIds } });
    const combinedPlaces = savedCampgrounds.concat(savedRvs);
    //remove Rv et campground at same time which duplicates
    campingPlaces = Array.from(new Set(combinedPlaces.map(place => place.place_id)))
  .map(placeId => combinedPlaces.find(place => place.place_id === placeId));

    res.json(campingPlaces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/getsavedreviews', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      console.log("express log", username)
      return res.status(404).json({ error: 'User not found.' });
    }

    // Access the array of place_ids
    const savedPlaceIds = user.savedCampgrounds;

    // Fetch reviews based on the saved place_ids
    const savedReviews = await Review.find({ "campgroundId": { $in: savedPlaceIds } });

    res.json(savedReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/getcamps', async (req, res) => {
  try {
    const camptype = req.body.camptype;
    const highlyRated = req.body.highlyRated ; 
    const all = req.body.all;
    const sortOrder = parseInt(req.body.sortOrder); // Convert to number
    const userLat = parseFloat(req.body.userLat); // Convert to number
    const userLng = parseFloat(req.body.userLng); // Convert to number
    console.log(camptype)
    console.log("all",all)
    console.log(sortOrder)
    console.log(highlyRated)
    let campingPlaces;

    if (all) {
    const campPlaces = await Camp.find();
    const rvParkPlaces = await Rvpark.find();
    const combinedPlaces = campPlaces.concat(rvParkPlaces);
    //remove Rv et campground at same time whih duplicates
    campingPlaces = Array.from(new Set(combinedPlaces.map(place => place.place_id)))
  .map(placeId => combinedPlaces.find(place => place.place_id === placeId));

    console.log("length all",campingPlaces.length)
    } else {
      if (camptype == '0') {
        campingPlaces = await Camp.find();
        console.log("length",campingPlaces.length)
      } else if (camptype == '1') {
        campingPlaces = await Rvpark.find();
        console.log("length",campingPlaces.length)
      } else if (camptype == '2') {
        
          const campPlaces = await Camp.find();
          const rvParkPlaces = await Rvpark.find(); const combinedPlaces = campPlaces.concat(rvParkPlaces);
          //remove Rv et campground at same time which duplicates
          campingPlaces = Array.from(new Set(combinedPlaces.map(place => place.place_id)))
        .map(placeId => combinedPlaces.find(place => place.place_id === placeId));
      
      }
    }

    if (highlyRated && all==false ) {
      campingPlaces = campingPlaces.filter(place => place.rating >= 3.0);
    }

    campingPlaces = campingPlaces.map(place => {
      const distanceFromYou = exactDistance(userLat, userLng, place.location.lat, place.location.lng);
      return { ...place.toObject(), distanceFromYou };
    });
    // Calculate distance and sort
    if (sortOrder === 1 && userLat && userLng) {
      

      campingPlaces = campingPlaces.sort((a, b) => a.distanceFromYou - b.distanceFromYou);
    } else if (sortOrder === 0) {
      // Sort by ratings
      campingPlaces = campingPlaces.sort((a, b) => b.rating - a.rating);
    }

    //sorted and filtered
    res.json(campingPlaces);
  } catch (error) {
    console.error('Error retrieving camping places:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/savecamp', async (req, res) => {
  try {
    const { campgroundId, username } = req.body;

    // Check 
    if (!campgroundId || !username) {
      return res.status(400).json({ error: ' campgroundId and username are required.' });
    }

    // Find 
    let user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // if savedCampgrounds array is not defined
    if (!user.savedCampgrounds) {
      user.savedCampgrounds = [];
    }

    // check if the campground is already saved
    if (user.savedCampgrounds.includes(campgroundId)) {
      return res.status(400).json({ error: 'Campground already saved by the user.' });
    }

    // save the campground for the user
    user.savedCampgrounds.push(campgroundId);
    await user.save();

    return res.status(200).json({ message: 'Campground saved successfully.' });
  } catch (error) {
    console.error('Error during save:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/addreview', async (req, res) => {
  const { campgroundId, title, comment, currentDate, rating, userId } = req.body;

  try {
    // Check
    const existingReview = await Review.findOne({ campgroundId, userId });

    if (existingReview) {
      // If a review already exists
      return res.status(400).json({ error: 'Review already exists for this user and campground.' });
    }

    // If no existing review is found
    const newReview = new Review({ campgroundId, title, comment, currentDate, rating, userId });
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/deletesavedcamp', async (req, res) => {
  try {
    const { campgroundId, username } = req.body;

    // Check if the campgroundId and username are provided
    if (!campgroundId || !username) {
      return res.status(400).json({ error: 'Both campgroundId and username are required.' });
    }

    // Find the user in the database
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the campground is in the user's savedCampgrounds
    const campgroundIndex = user.savedCampgrounds.findIndex(item => item == campgroundId);

    if (campgroundIndex === -1) {
      return res.status(400).json({ error: 'Campground not found in user\'s saved list.' });
    }

    // Remove the campground from the user's savedCampgrounds
    // user.savedCampgrounds.remove(campgroundId);

    user.savedCampgrounds = user.savedCampgrounds.filter(item => item !== campgroundId)

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Campground deleted successfully.' });
  } catch (error) {
    console.error('Error during delete:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/getreviews', async (req, res) => {
  const { campgroundId } = req.body;

  try {
    const reviews = await Review.find({ campgroundId });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
