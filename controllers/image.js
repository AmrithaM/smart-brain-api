const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'acf86ee453874f4086a5a1b72d3c4bd6'
});

const handleAPICall = (req, res) => {
	app.models
	.predict(Clarifai.CELEBRITY_MODEL, req.body.input)
    .then(data =>{
    	res.json(data);
    })
    .catch(error=>res.status(400).json("Unable to work with API"))
}

const handleImage = (postgres) => (req, res) => {
	const {id} = req.body;
	
	postgres('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0]);
	  })
	  .catch(error=>{
	  	res.status(400).json("Unable to get entries");
	  })
}

module.exports = {
	handleImage: handleImage,
	handleAPICall: handleAPICall
}