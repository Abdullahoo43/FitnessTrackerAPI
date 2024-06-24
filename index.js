const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
