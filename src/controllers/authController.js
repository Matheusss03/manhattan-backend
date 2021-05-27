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
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.senha,
        user.senha
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Senha incorreta!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        nome: user.nome,
        email: user.email,
        celular: user.celular,
        instituicao: user.instituicao,
        cnen: user.cnen,
        tipo: user.tipo,
        conselho: user.conselho,
        roles: authorities,
        accessToken: token
      });
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