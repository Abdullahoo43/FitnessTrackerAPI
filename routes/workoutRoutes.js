const express = require('express');
const { getWorkouts, addWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const {checkToken, auth} = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getWorkouts);
router.post('/', auth, addWorkout);
router.put('/:id', auth, updateWorkout);
router.delete('/:id', auth, deleteWorkout);

module.exports = router;