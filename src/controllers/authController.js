const express = require('express')
const passport = require('passport')

const router = express.Router()

/* Autenticação */

router.get('/login', function(req, res, next)  {
	if (req.user) {
		res.redirect('/')
	} else {
		res.render('login')
	}
})

router.post('/login', passport.authenticate('local-login', {
	failureRedirect : '/auth/login',
	failureFlash : false // allow flash messages
}), function(req, res, next)  {
	res.redirect('/')
});

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

module.exports = app => app.use('/auth', router)