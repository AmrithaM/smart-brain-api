const handleRegister = (postgres, bcrypt) => (req, res) => {
	
	const {email, name, password} = req.body;
	if(!email || !name || !password){
		return res.status(400).json("Incorrect form submission")
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	postgres.transaction(trx => {

		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			}).then(user =>{
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(error => res.status(400).json("unable to register"))
}

module.exports = {
	handleRegister: handleRegister
}