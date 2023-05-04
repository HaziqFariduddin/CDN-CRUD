//modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

//env variables for mongo db connection
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => console.log('Connected to MongoDB')
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running in port 5000'))