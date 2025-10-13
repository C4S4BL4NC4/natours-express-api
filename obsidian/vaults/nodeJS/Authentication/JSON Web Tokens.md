[[Authentication]]

When a user logs into the server we generate a #JWT unique to that user then store it at Clients Machine as a cookie or in local storage and a String on the server.

### JWT Authentication
![[JWTAuth.png]]
### What JWT Looks like
![[JWTEncoding.png]]
### JWT Verification
![[JWTVerify.png]]

### JSON WEB TOKEN INSTALL
Installing the JWT Lib from NPM `npm i jsonwebtoken`

#### `jwt.sign(payload, secretOrPrivateKey, [options, callback])`

(Asynchronous) If a callback is supplied, the callback is called with the `err` or the JWT.

(Synchronous) Returns the JSON Web Token as string.


#### `jwt.verify(token, secretOrPublicKey, [options, callback])`

`(Asynchronous)` If a callback is supplied, function acts asynchronously. The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.

`(Synchronous)` If a callback is not supplied, function acts synchronously. Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.


`options`:

- `algorithm` (default: `HS256`)
- `expiresIn`: expressed in seconds or a string describing a time span.
    
    > Eg: `60`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc.), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).
    
- `notBefore`: expressed in seconds or a string describing a time span.
    
    > Eg: `60`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc.), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).
    
- `audience`
- `issuer`
- `jwtid`
- `subject`
- `noTimestamp`
- `header`
- `keyid`
- `mutatePayload`: if true, the sign function will modify the payload object directly. This is useful if you need a raw reference to the payload after claims have been applied to it but before it has been encoded into a token.
- `allowInsecureKeySizes`: if true allows private keys with a modulus below 2048 to be used for RSA
- `allowInvalidAsymmetricKeyTypes`: if true, allows asymmetric keys which do not match the specified algorithm. This option is intended only for backwards compatibility and should be avoided.

> There are no default values for `expiresIn`, `notBefore`, `audience`, `subject`, `issuer`. These claims can also be provided in the payload directly with `exp`, `nbf`, `aud`, `sub` and `iss` respectively, but you **_can't_** include in both places.