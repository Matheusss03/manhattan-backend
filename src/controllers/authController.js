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

/* Registro Novo */
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body)

        //user.senha = undefined

        return res.send( { 
            user,
            token: generateToken({ id: user.id })
        })
    } catch (err) {
        return res.status(400).send({ error: "Deu ruim!  " + err })
    }
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

    const token = jwt.sign({ id: user.id}, authConfig.secret, {
        expiresIn: 86400
    })

    res.send( { 
        user, 
        token: generateToken({ id: user.id })
    })
})

module.exports = app => app.use('/auth', router)