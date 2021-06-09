const express = require('express')
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

/* Usuário Novo */
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
router.put('/update/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
    .then(usuario => res.json(usuario))
    .catch(err => res.status(400).json({ error: 'Erro ao atualizar o banco' }))
})

/* Pega um em específico */
router.get('/:id', async (req, res) => {
    await User.findById(req.params.id)
    .then(usuario => res.json(usuario))
    .catch(err => res.status(404).json({userfound: 'Usuário não encontrado'}))
})

/* Exclui um usuário */
router.delete('/delete/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id, req.body)
    .then(usuario=> res.json(usuario))
    .catch(err => res.status(404).json({ error: 'Usuário não encontrado' }))
})


module.exports = app => app.use('/usuario', router)