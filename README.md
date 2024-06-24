<b><h1>FitnessTrackerAPI</h1></b>

There are 4 apis for the workout that are specific to the user.

There are 2 API's for the user, which are, login and register.

API's are run through postman. These 4 API's will not work until user register and then login i.e, there is authentication before calling the API

First API to be called is the register API that in which we pass the 'username' and the 'password' in the body for the registeration of the user. This API will store the username and the hashed password in the database

route for the register API is POST localhost:5000/api/users/register

next you can login the user with the valid credentials(username and password) to be send in the body. This API will respond back the jwt token which will be pass to the workout API's to work.

route for the login API is POST localhost:5000/api/users/login

After login, one can add workout through addWorkout API. Workout enteries contain 'workoutType', 'duration', 'caloriesBurned', and 'date'. which are to be passed in the body. JWT token must be passed. This API automaticall add the username through the token.

next API that is getWorkout will get all the workouts specific to the authenticated user. This also requires the JWT token.

deleteWorkout API deletes the user based on the id which is to be passed in the req.params. and updateWorkout API update the workout based on the id provided in the req.params

routes for these API's are 

getWorkout GET localhost:5000/api/workouts

addWorkout POST localhost:5000/api/workouts

deleteWorkout DELETE localhost:5000/api/workouts/{id}

updateWorkout PUT localhost:5000/api/workouts/{id}
