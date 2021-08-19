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

router.get('/rest-api/', function (req, res) {
    res.sendFile(path.join(__dirname + '/restapi.html'));
});

router.post('/get-valid-token/', function (req, res) {

	// If user is valid and logged in, return the jwt with your learncube user details

	const privateKey = process.env.privateKey || 'set private key in the .env file'
	const username = process.env.username || 'set username in .env file'
	const user_id = process.env.user_id || 'set user_id in .env file'
	const email = process.env.email || 'set email in .env file'

	const token = jwt.sign({
	  "exp": Math.floor(Date.now() / 1000) + (60 * 5),
	  "username": username, 
	  "user_id": user_id,
	  "email": email,
	}, privateKey, { algorithm: 'HS256' })

	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({ 'token': token }))
});

app.use('/', router);
app.listen(process.env.port || 3000)