[[Authentication]]

A Cookie is a snippet of text a server first send to a client then whenever a client make a future request the cookie get sent along back to the server.

To send a cookie attach it the the `response` object  
```JavaScript
const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production'){
  cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);
```