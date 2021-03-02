const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

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

        //let user = new User(req.body)
        //user.save()

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
    User.findById(req.params.id, function(err, dado){
        if (!dado) {
            res.status(404).send('Dado não encontrado')
        } else {
            dado.nome = req.body.nome
            dado.tipo = req.body.tipo
            dado.cpf = req.body.cpf
            dado.cheio = req.body.cheio
            dado.vazio = req.body.vazio
            dado.altaTensao = req.body.altaTensao
            dado.bario = req.body.bario
            dado.cesio = req.body.cesio
            dado.cobalto = req.body.cobalto
        }

        dado.save().then(dado => {
            res.json('Dado atualizado!!')
        })
        .catch(err => {
            res.status(404).send('Atualização não foi possível')
        })
    })
})

/* Autenticação */
router.post('/authenticate', async (req, res) => {
    const { email, senha} = req.body

    const user = await User.findOne({ email }).select('+senha')

    if (!user) {
        return res.status(400).send({ error: 'Usuário não existente'})
    }

    if (!await bcrypt.compare(senha, user.senha)) {
        return res.status(400).send({ error: 'Senha inválida!' })
    }

    user.senha = undefined

    res.send( { 
        user, 
        token: generateToken({ id: user.id })
    })
})

module.exports = app => app.use('/auth', router)