require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = 3000;
const jwt = require('jsonwebtoken');
app.use(express.json());



router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/validate-token/', function (req, res) {

	// If user is valid and logged in, return the jwt 

	const privateKey = process.env.privateKey || 'no private key provided'

	const token = jwt.sign({
	  "exp": Math.floor(Date.now() / 1000) + (60 * 5),
	  "username": "brianos",
	  "user_id": 455197,
	  "email": "brian+os@learncube.com"
	}, process.env.privateKey, { algorithm: 'HS256' })

	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({ 'token': token }))
});

app.use('/', router);
app.listen(process.env.port || 3000)