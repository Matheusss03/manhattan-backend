const LocalStrategy = require('passport-local').Strategy
const User = require('../models/usuario')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

module.exports = function(passport) {
    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'senha',
            passReqToCallback: true
        }, async (email, senha, done) => {
            try{
                const user = await User.findOne({ email })

                if(!user) {
                    return done(null, false, { message: 'Email incorreto.' })
                }

                if (!user.validPassword(senha)) {
                    return done(null, false, { message: 'Senha incorreta.' });
                }

                return done(null, user)
        } catch(error) {
            return done(error)
        }
    }))

    passport.use(
        'signup',
        new LocalStrategy(
          {
            usernameField: 'email',
            passwordField: 'senha'
          },
          async (req, done) => {
            try {
              const user = await User.create(req.body);
      
              return done(null, user);
            } catch (error) {
              done(error);
            }
          }
        )
      );


    passport.use(
        new JWTstrategy(
          {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
          },
          async (token, done) => {
            try {
              return done(null, token.user);
            } catch (error) {
              done(error);
            }
          }
        )
      );
/*
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'senha',
        passReqToCallback : true 
        }, function(req, email, senha, done) {

        if (req.user) {
            return done(null, req.user);
        }

        User.findOne({email : email}).then(function(user) {

            if (user) {
                return done(null, false);
            }

            new User({
                email: email,
                senha: User.generateHash(senha),
                privilegio: req.body.privilegio,
                nome: req.body.nome,
                cnen: req.body.cnen,
                conselho: req.body.conselho,
                cpf: req.body.cpf,
                tipo: req.body.tipo,
                celular: req.body.celular
            }).save(function(err, savedUser) {
                if (err) {
                    return done(err, false)
                }
                return done(null, savedUser)
            })
        }).catch(function(err) {done(err, false)})
    }))
*/
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
}