[[Express Framework]]

We can make multiple routers of an API e.g. `/api/v1/tours`, `/api/v1/users`, or `/api/v1/recipes`. And instead of connecting them directly to the `app` we can:
```JavaScript
const tourRouter = express.Router();
```

Then use `tourRouter` as a middleware *(Mounting the router must come before declaration)*:
```JavaScript
// AT THE BEGINNING OF A FILE 
// Mounting the router
app.use('/api/v1/tours', toursRouter);
```

When we calling the http methods on it would look like: 
```JavaScript
// Tours
// toursRouter = '/api/v1/tours'
toursRouter.route('/').get(getAllTours).post(createTour);
toursRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

// Users
// usersRouter = '/api/v1/users'
usersRouter.route('/').get(getAllUsers).post(createUser);
usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
```
