const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()
const User = require('../models/usuario')

/* Autenticação */

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
);

router.post('/login', (req, res) => {
  const user = new User({
    nome: req.body.nome,
    email: req.body.email,
    celular: req.body.celular,
    conselho: req.body.conselho,
    instituicao: req.body.instituicao,
    cnen: req.body.cnen,
    tipo: req.body.tipo,
    senha: bcrypt.hashSync(req.body.senha, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } res.send({ message: "Usuário registrado com sucesso!" });
        });
      });

/*
router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
)


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
*/
module.exports = app => app.use('/auth', router)