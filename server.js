require('dotenv').config();  
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Restaurant = require('./models/Restaurant');  

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});


app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();  
        res.json(restaurants);  
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    try {
        const cuisine = req.params.cuisine;
        const restaurants = await Restaurant.find({ cuisine: { $in: [cuisine] } });  
        res.json(restaurants);  
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/restaurants', async (req, res) => {
    try {
        const sortBy = req.query.sortBy === 'ASC' ? 1 : -1; 
        const restaurants = await Restaurant.find({}, 'restaurant_id cuisine name city restaurant_id')
            .sort({ restaurant_id: sortBy });  
        res.json(restaurants);  
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.get('/restaurants/Delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({
            cuisine: { $in: ['Delicatessen'] }, 
            city: { $ne: 'Brooklyn' }  
        }, 'cuisine name city')  
            .sort({ name: 1 });  
        res.json(restaurants);  
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
