const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt")
const app = express();
app.use(cors());
app.use(express.json());
const jsonwebtoken = require("jsonwebtoken")

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Food')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Food Schema & Model
const FoodItemSchema = new mongoose.Schema({
  img: String,
  FoodName: String,
  Description: String,
  Price: Number,
});
const FoodItem = mongoose.model('FoodItem', FoodItemSchema, 'FoodItems');


const register = new mongoose.Schema({
  firstname: String,
  lastname: String,
  dob: Date,
  email: String,
  username: String,
  password: String
})

const registermodel = mongoose.model("Users", register, "userlist")

app.post("/register", async (req, res) => {
  const { firstname, lastname, dob, email, username, password } = req.body;
  try {
    const existingUser = await registermodel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await registermodel.create({
      firstname,
      lastname,
      dob,
      email,
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: "New User is registered" });
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await registermodel.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "Not a Registered User" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid user credentials" });
    }

    const token = jsonwebtoken.sign({ username }, "secret123", { expiresIn: "1d" });
    res.status(200).json({ message: "User successfully logged in", token });
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Offer Schema & Model
const OfferSchema = new mongoose.Schema({
  FoodName: String,     
  text: String,          // Description to show in UI
  minAmount: Number,      // Minimum total price required to activate offer
  discountAmount: Number, // How much to discount (e.g. 20)
});


const Offer = mongoose.model('Offer', OfferSchema, 'Offers'); // 'offers' is your MongoDB collection



// Dashboard Route
app.get('/Dashboard', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).send('Server Error');
  }
});
// Route to get offers based on ordered food items
app.post('/get-offers', async (req, res) => {
  try {
    const { orderedItems } = req.body;

    if (!Array.isArray(orderedItems)) {
      return res.status(400).json({ message: 'Invalid input format' });
    }

    // Get all relevant offers for items ordered (case-insensitive)
    const offers = await Offer.find({
      FoodName: {
        $in: orderedItems.map(name => new RegExp(`^${name}$`, 'i'))
      }
    });

    // Get all food items matching orderedItems (case-sensitive to match DB)
    const foodItems = await FoodItem.find({
      FoodName: {
        $in: orderedItems
      }
    });

    console.log("🍽️ Ordered Items:", orderedItems);
    console.log("📦 All foodItems from DB:", foodItems.map(item => item.FoodName));

    // Build priceMap with normalized keys (lowercase trimmed)
    const priceMap = {};

    orderedItems.forEach(name => {
      const matched = foodItems.find(item => item.FoodName.toLowerCase() === name.toLowerCase());
      if (!matched) {
        console.warn(`⚠️ No match found for "${name}"`);
        return; // skip unmatched
      }
      const key = matched.FoodName.toLowerCase().trim();
      priceMap[key] = (priceMap[key] || 0) + matched.Price;
    });

    console.log("🍔 priceMap:", priceMap);

    // Filter offers based on normalized keys and minAmount
    const validOffers = offers.map(offer => {
      const key = offer.FoodName.toLowerCase().trim();
      const foodTotal = priceMap[key] || 0;

      return {
        ...offer.toObject(),
        applied: foodTotal >= offer.minAmount
      };
    });

    console.log("🎁 validOffers:", validOffers);

    res.json({ offers: validOffers });

  } catch (error) {
    console.error('🔥 Server crash in /get-offers:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: error.message });
  }
});







app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
