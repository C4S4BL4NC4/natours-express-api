[[Node Farm]]

A  nodeJs library that is used for link routing to load different pages.


### Importing the library: 

`const url = require("url");`

### Making a request:

sending a request via browser it will automatically send to `/favicon.ico`
and whatever after the `/` in the browser link query.

```
const server = http.createServer((req, res) => {

  const pathWay = req.url;

  

  if (pathWay === "/overview") {

    res.end("This is the OVERVIEW");

  } else if (pathWay === "/product") {

    res.end("This is the PRODUCT");

  } else {

    res.writeHead(404, {

      "Content-type": "text/html",
      "my-own-header": "micron",

    }); // To write a header that has some options 

    res.end("<h1>Page not found!!</h1>");

  }

  // Sending back a plain text simple response.

});

  

server.listen(8000, "127.0.0.1", () => {

  console.log("Server Has Started listening to req ons port 127.0.0.1:8000");

});
```

==we can also use `__dirname` with a string literal to specify the current directory instead of the `./`== 
e.g. 
`${__dirname}/dev-data/data.json`


##### For ==`'Content-type'`== 
- `"text/html",
- `"application/json"`





