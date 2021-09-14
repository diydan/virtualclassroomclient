# Learncube Virtual Classroom Client

### [Overview](README.md)
  * [Quickstart](README.md#quickstart)

### [Production Use](PRODUCTION.md)
  * [Routes](PRODUCTION.md#routes)
  * [Browser Support](PRODUCTION.md#browser)
  * [Authentication](PRODUCTION.md#authentication)
  * [Events](PRODUCTION.md#events)
  * [Breakout Rooms](PRODUCTION.md#breakout-rooms)
  * [Client Api Reference](PRODUCTION.md#api-reference)

### [Rest Api](RESTAPI.md)
  * [Classrooms](RESTAPI.md#classrooms)
  * [Participants](RESTAPI.md#participants)


## Authentication

The Learncube Virtual Classroom and REST API both use [JSON Web Tokens (JWT)](https://jwt.io/) to validate all api calls. JSON Web Tokens are encoded strings that consist of 3 parts, header, payload and signature, separated by dots. The JWT must be generated by you and added to each request in the "Authorization" header. 

For the Virtual Classroom Client, the URL endpoint that generates the token must be included in the `userConfig` object that is passed to the constructor. There is a working example included in the example application.


### JSON WEB TOKENS

The ***Header*** typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
The ***Payload*** consists of user data corresponding to the Learncube API Users account (username, user_id, email) and a timestamp that is some time in the future. The `exp` property defines when this token will expire. We recommend a value between 5 and 15 minutes.

*** Important: This must match the user data we have stored for the Learncube account holder. ***
```json
{
  "username": "learncube_user",
  "user_id": 12345,
  "email": "learncube_user@yourdomain.com",
  "exp": 1626254079
}
```
The ***Signature*** is the consists of the header and payload, encrypted with your Learcube Private Key using the algorithm contained in the header.

The end result is three Base64-URL strings separated by dots. The HTTP response from your auth endpoint must have a 200 status code and return the token in a valid JSON object with `token` as the key.

```json
{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlYXJuY3ViZV91c2VyIiwidXNlcl9pZCI6MTIzNDUsImVtYWlsIjoibGVhcm5jdWJlX3VzZXJAeW91cmRvbWFpbi5jb20iLCJleHAiOjE2MjYyNTQwNzl9.tnIG4tJcpZ0sT4THyvQTvOckUStKbwUOkAsKatYMti4"}
```


The Learncube Virtualclassroom Client will include this token in the authoraization header in each request to the Learncube API server. When the token expires, we will return a `401 Unauthorized` error response, immediately re-request a token from your auth endpoint and retry the request the unauthorised request. 
***Important: Never share your secret key with anyone or include it in publicly visible code.*** 

#### Examples
There are many good libraries available for creating JWT's. Some samples below.

[Node - jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
```javascript
const jwt = require('jsonwebtoken')

const token = jwt.sign({
  "exp": Math.floor(Date.now() / 1000) + (60 * 60),
  "username": "learncube_user",
  "user_id": 12345,
  "email": "learncube_user@yourdomain.com"
  }, "your-secret-key", { algorithm: 'HS256' })

const header = "Bearer " + token
```

[Python - pyjwt](https://pyjwt.readthedocs.io/en/stable/)
```python
import jwt, datetime
token = jwt.encode({
    "username": "learncube_user",
    "user_id": 12345,
    "email": "learncube_user@yourdomain.com"
    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
  }, 'your-secret-key', algorithm="HS256")

header = "Bearer " + token
```
