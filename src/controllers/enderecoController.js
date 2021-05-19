const express = require('express')

const Endereco = require('../models/endereco')

const router = express.Router()


// Lista todas os endereços
router.get('/todos', async (req, res) =>{
    try {
        const enderecos = await Endereco.find()

        return res.send({ enderecos })
    } catch (err) {
        return res.status(400).send({ error:'Erro ao pegar todos endereços!!  ' + err })
    }
})

// Cadastra um endereço
router.post('/add', async (req, res) =>{
    try {
        const endereco = await Endereco.create( req.body )

        return res.send({ endereco })
    } catch (err) {
        return res.status(400).send({ error:'Erro ao cadastrar um endereço!!  ' + err })
    }
})

// Remove um endereço
router.delete('/:id', async (req, res) => {
    try {
        await Endereco.findByIdAndRemove(req.params.id)

        return res.send()
    } catch (err) {
        return res.status(400).send({ error:'Erro ao apagar um endereço!!  ' + err })
    }
})

module.exports = app => app.use('/endereco', router)