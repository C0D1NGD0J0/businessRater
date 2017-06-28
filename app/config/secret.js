module.exports = {
	auth: {
		user: 'sam.gdouglas@gmail.com',
		pwd: 'Aleesi@12'
	},
	facebook:{
		clientID: '225130474663802',
		clinetSecret: '12f24b6179596c17eb29e6dc2a03b4f7',
		profileFields: ['email', 'displayName'],
		callbackURL: 'http://localhost:3000/auth/facebook/callback',
		passReqToCallback: true
	}
}
