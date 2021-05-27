const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')
const passport = require('passport')

const User = require('../models/usuario')

const router = express.Router()

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

/* Listar Todos */
router.get('/todos', async (req, res) => {
    await User.find(function(err, usuarios){
        if (err) console.log(err) 
        else res.json(usuarios)
    })
})

/* Registro Novo */
router.post('/add', async (req, res) => {
    try {
        const user = await User.create(req.body)

        return res.send( { 
            user,
            token: generateToken({ id: user.id })
        })
    } catch (err) {
        return res.status(400).send({ error: "Deu ruim!  " + err })
    }
})

/* Atualiza Usuário */
router.post('/update/:id', async (req, res) => {
    User.findById(req.params.id, function(err, usuario){
        if (!usuario) {
            res.status(404).send('Usuário não encontrado')
        } else {
            usuario.nome = req.body.nome
            usuario.cnen = req.body.cnen
            usuario.conselho = req.body.conselho
            usuario.cpf = req.body.cpf
            usuario.email = req.body.email
            usuario.tipo = req.body.tipo
            usuario.privilegio = req.body.privilegio
            usuario.celular = req.body.celular
        }

        usuario.save().then(usuario => {
            res.json('Usuário atualizado!!')
        })
        .catch(err => {
            res.status(404).send('Atualização não foi possível')
        })
    })
})

/* Pega um em específico */
router.get('/:id', async (req, res) => {
    const id = req.params.id

    await User.find(id, function(err, dado){
        if(err) res.status(400).send({error: 'Erro ao pegar o elemento'+ id + '  ' + err})
        else res.json(dado)
    })
})

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



/*
router.post('/authenticate', async (req, res) => {
    try {
        const { email, senha } = req.body
        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).send({ error: 'Usuário não existente'})
        }

        const senhaValida = await
    }catch (error) {
        return res.status(400).send({ error: 'Usuário não existente'})
    }
})
*/
module.exports = app => app.use('/auth', router)