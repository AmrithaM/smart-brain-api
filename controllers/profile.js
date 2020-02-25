const handleProfile = (postgres) => (req, res) => {
	const {id} = req.params;

	postgres.select().from('users').where({id})
	.then(user =>{
		if(user.length){
			res.json(user[0]);	
		}else{
			res.status(400).json("Not found");	
		}
		
	})
	.catch(error=>{
		res.status(400).json("Error getting user");
	})
}

module.exports = {
	handleProfile: handleProfile
}