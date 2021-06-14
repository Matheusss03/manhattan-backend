const express = require('express')

const Instrumento = require('../models/instrumento')

const router = express.Router()

/* Listar Todos Instrumentos*/
router.get('/todos', async (req, res) => {
    await Instrumento.find(function(err,instr){
        if(err) res.status(400).send({error: 'Erro ao pegar todos os elementos!!  ' + err})
        else res.json(instr)
    })

})

/* Novo Instrumento */
router.post('/add', async (req, res) => {
    try {
        const maquina = await Instrumento.create(req.body)

        return res.send( { maquina })
    } catch (err) {
        return res.status(400).send({ error: "Deu ruim!  " + err })
    }
})

/* Pega um em específico */
router.get('/:id', async (req, res) => {
    await Instrumento.findById(req.params.id)
    .then(instr => res.json(instr))
    .catch(err => res.status(404).json({datafound: 'Dado não encontrado'}))
})

/* Deleta um especíico */
router.delete('/delete/:id', async (req, res) => {
    try {
        await Instrumento.findByIdAndRemove(req.params.id)

        return res.send()
    } catch (err) {
        return res.status(400).send({error: 'Erro ao deletar objeto!  ' + err})
    }
})

/* Atualiza Instrumento */
router.put('/update/:id', async (req, res) => {
    await Instrumento.findByIdAndUpdate(req.params.id, req.body)
    .then(instr => res.json(instr))
    .catch(err => res.status(400).json({ error: 'Erro ao atualizar o banco' }))
})

module.exports = app => app.use('/instrumento', router)