const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'amritha',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


//To check if the back-end is working
app.get('/', (req, res) => {
	postgres.select().table('users').then(data =>{res.send(data)})
})

//sign-in
app.post('/signin', signin.handleSignin(postgres, bcrypt))

//register
app.post('/register', register.handleRegister(postgres, bcrypt))

//get user profile
app.get('/profile/:id', profile.handleProfile(postgres))

//to update the entries count
app.put('/image', image.handleImage(postgres))

//to get the image URL from the front-end and return back the coordinated and prediction
app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)})

app.listen(3000, () =>{
	console.log("App is running");
});