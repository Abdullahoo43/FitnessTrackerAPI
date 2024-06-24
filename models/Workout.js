const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
   user: {
      type: String,
      required: true
   },
   workoutType: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   },
   duration: {
      type: Number,
      required: true
   },
   caloriesBurned: {
      type: Number,
      required: true
   }
});

module.exports = mongoose.model('workout', WorkoutSchema); 