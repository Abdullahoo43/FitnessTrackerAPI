const Workout = require('../models/Workout');
const Joi = require('joi');

// Validation schema
const workoutSchemaAdd = Joi.object({
  workoutType: Joi.string().required(),
  date: Joi.date(),
  duration: Joi.number().required(),
  caloriesBurned: Joi.number().required()
});

const workoutSchemaSearch = Joi.object({
  workoutType: Joi.string(),
  date: Joi.date(),
  duration: Joi.number(),
  caloriesBurned: Joi.number()
});

exports.getWorkouts = async (req, res) => 
{
  try 
  {
    const workouts = await Workout.find({user: req.user});
    res.json(workouts);
  } 
  catch (error)
  {
    res.status(500).send('Server Error');
  }
};

exports.addWorkout = async (req, res) => 
{
  try 
  {
    req.body.user = req.user;
    const newWorkout = new Workout(req.body);
    const workout = await newWorkout.save();
    res.json(workout);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

exports.updateWorkout = async (req, res) => 
{
  try 
  {
    let workout = await Workout.findOne({_id: req.params.id});
    if (!workout) return res.status(404).json({ msg: 'Workout not found' });

    // Ensure user owns workout0
    if (workout.user !== req.user) 
    {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    req.body.user = req.user;
    let workoutUpdated = await Workout.findByIdAndUpdate(
      {_id: req.params.id},
      { $set: req.body }
    );

    res.json(workoutUpdated);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

exports.deleteWorkout = async (req, res) => 
{
  try 
  {
    const workout = await Workout.findOne({_id: req.params.id});
    if (!workout) return res.status(404).json({ msg: 'Workout not found' });

    if(workout.user === req.user)
    { 
      await Workout.findByIdAndDelete({_id: req.params.id});
    }
    else
    {
      return res.status(404).json({ msg: 'not authorized' });
    }

    res.json({ msg: 'Workout removed' });
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};
