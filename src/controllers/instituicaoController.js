const express = require('express')

const Instituicao = require('../models/instituicao')

const router = express.Router()

// Lista todas as instituições
router.get('/todos', async (req, res) => {
    await Instituicao.find(function(err,instituicao){
        if(err) res.status(400).send({error: 'Erro ao pegar todos os elementos!!  ' + err})
        else res.json(instituicao)
    })

})

// Remove uma instituição
router.delete('/delete/:id', async (req, res) => {
    try {
        await Instituicao.findByIdAndRemove(req.params.id)

        return res.send()
    } catch (err) {
        return res.status(400).send({error: 'Erro ao deletar objeto!  ' + err})
    }
})

// Cadastra uma instituição
router.post('/add', async (req, res) => {
    try {
        const instituicao = await Instituicao.create(req.body)

        return res.send( { instituicao })
    } catch (err) {
        return res.status(400).send({ error: "Deu ruim!  " + err })
    }
})

/* Pega uma instituição em específico */
router.get('/:id', async (req, res) => {
    await Instituicao.findById(req.params.id)
    .then(instituicao => res.json(instituicao))
    .catch(err => res.status(404).json({datafound: 'Instituição não encontrado'}))
})

/* Atualiza Instituição */
router.put('/update/:id', async (req, res) => {
    await Instituicao.findByIdAndUpdate(req.params.id, req.body)
    .then(instituicao => res.json(instituicao))
    .catch(err => res.status(400).json({ error: 'Erro ao atualizar o banco' }))
})

module.exports = app => app.use('/instituicao', router)