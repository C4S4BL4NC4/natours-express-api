Pug is indentation dependant just like Python. Here is a sample of how pug should be written.


```Pug
doctype html
html

    head
        title Natours
        link(rel='stylesheet' href='css/style.css')

        link(rel='shortcut icon' type='image/png' href='img/favicon.png')
    body
        h1 Park Camper    //- Dynamic naming
        p This is a test
```


### Passing Variables

Remember that we can pass data in the `{resData}` object.
```JS
// Routes
app.get('/', (req, res) => {
  res.status(200).render('base', {resData});
});
```

Doing that makes us able to render data dynamically (Buffered Code) using the `=` operator/symbol.
```Pug
html

    head
        title Natours
        link(rel='stylesheet' href='css/style.css')

        link(rel='shortcut icon' type='image/png' href='img/favicon.png')
    body
        h1= resData    
        //- Dynamic variable
        p This is a test
```

### Comments

Comments are written in two different way.
1.  `// This is a comment` Visible in HTML file.
2.  `//- This is a comment` Only visible in the Pug file.

==*NOTE: COMMENTS MUST NOT BE IN THE SAME LINE*==

### Writing JavaScript in Pug

#### Buffered Code
```pug
//- Inside base.pug
h2= user.toUpperCase();
```

#### Unbuffered Code
code that does not affect the output.
```pug
//- Inside base.pug
- const x = 9; // Unbuffered code
h2= 2/x // Consuming unbuffered in buffered
```

#### Interpolation

```pug
//- Inside base.pug
title Natours | #{tour} 
//- Just like template strings
```



### Specifying Classes

To make a pug class we use `.` operator.

```pug
header.header
nav.nav.nav--tours
```