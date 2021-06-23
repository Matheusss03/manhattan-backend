const express = require('express')

const DadoCalibrador = require('../models/dado_calibrador')

const router = express.Router()

/* Listar Todos Diarios*/
router.get('/todos', async (req, res) => {
    await DadoCalibrador.find(function(err,dados){
        if(err) res.status(400).send({error: 'Erro ao pegar todos os elementos!!  ' + err})
        else res.json(dados)
    })

})

/* Novo Registro */
router.post('/add', async (req, res) => {
    try {
        const diario = await DadoCalibrador.create({ ...req.body, usuario: req.userId })

        return res.send( { diario })
    } catch (err) {
        return res.status(400).send({ error: "Deu ruim!  " + err })
    }
})

/* Pega um em específico */
router.get('/:id', async (req, res) => {
    await DadoCalibrador.findById(req.params.id)
    .then(dado => res.json(dado))
    .catch(err => res.status(404).json({datafound: 'Dado não encontrado'}))
})

/* Deleta um especíico */
router.delete('/delete/:id', async (req, res) => {
    try {
        await DadoCalibrador.findByIdAndRemove(req.params.id)

        return res.send()
    } catch (err) {
        return res.status(400).send({error: 'Erro ao deletar objeto!  ' + err})
    }
})

/* Atualiza Dado Calibrador */
router.put('/update/:id', async (req, res) => {
    await DadoCalibrador.findByIdAndUpdate(req.params.id, req.body)
    .then(dado => res.json(dado))
    .catch(err => res.status(400).json({ error: 'Erro ao atualizar o banco' }))
})

module.exports = app => app.use('/curiometro', router)