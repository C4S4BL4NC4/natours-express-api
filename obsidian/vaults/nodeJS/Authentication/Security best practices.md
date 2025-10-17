[[Authentication]]

#### Compromised Database:
- Strongly encrypt passwords with salt and hash (`bcrypt`)
- Strongly encrypt passwords reset tokens (`SHA256`)
#### Brute Force Attacks:
- Use `bcrypt` (to make login requests slow --*it takes time to encrypt stuff*)
- Implement rate limiting (`express-rate-limit`)
- Implement maximum login attempts
#### Cross-site Scripting (XSS) Attacks:
- Store JWT in `HTTPOnly cookies` *--Making a browser only send/receive a token but never access it*
- Sanitize user input data *--Cut any non usable data coming using middleware*
- Set special HTTP headers (`helmet package`)
#### Denial-of-Service (DOS) Attack:
- Implement rate limiting (`express-rate-limit`)
- Limit body payload (`in body-parser`)
- Avoid evil regular expressions *--Regular expression that take exponential time to run for non-matching keywords*
#### NOSQL Query Injection:
- Use mongoose for MongoDB (because of Schema Types)
- Sanitize user input data

#### Other Best Practices And Suggestions:
- Always user HTTPS
- Create random password reset tokens with expiry dates
- Deny access to JWT after a password change
- Don't commit sensitive config data to Git
- Don't send error details to clients
- Prevent Cross-Site Request Forgery (`csurf` package)
- Require re-authentication before a high-value action
- Implement a blacklist of untrusted JWT
- Confirm user email address after first creating account
- Keep user logged in with refresh tokens
- Implement two-factor authentication
- Prevent parameter pollution causing Uncaught Exceptions