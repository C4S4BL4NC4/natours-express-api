[[MVC Architecture in our express app]]


Pug is used to render/consume API endpoints and spitting a server side rendered website to a user.

To install pug

```JS
npm install pug
```

Also pug works hand in hand with the `static file serving middleware`

```JS
// in app.js

// View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving Static files such as icons and css
app.use(express.static(path.join(__dirname, 'public')));
```


### Rendering The Website

To render a website we must direct traffic to the root folder '/' and must use the `.render()`  method to get something out of it.
```JS
// Routes
app.get('/', (req, res) => {
  res.status(200).render('base', {resData});
});
```
