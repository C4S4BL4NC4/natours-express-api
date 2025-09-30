[[Express Framework]]

Accessing files that are in the #fs such as images, HTML, and CSS files via a browser is not possible without 

Lets say that there is a folder called `public`.
`app.use(express.static(dirname/public))` you can access the files inside `public` from the URL bar without the need to include `website/public/theFile` but rather `website/theFile`.