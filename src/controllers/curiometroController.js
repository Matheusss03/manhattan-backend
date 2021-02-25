const express = require('express')

const DadoCalibrador = require('../models/dado_calibrador')

const router = express.Router()

/* Novo Registro */
router.post('/add', async (req, res) => {
    try {
        const diario = await DadoCalibrador.create(req.body)

        return res.send( { diario })
    } catch (err) {
        return res.status(400).send({ error: "Deu ruim!  " + err })
    }
})

/* Pega um em especíico */
router.get('/:id', async (req, res) => {
    try {
        const dado = await DadoCalibrador.findById(req.params.id)

        return res.send({ dado })
    } catch (err) {
        return res.status(400).send({error: 'Erro ao pegar objeto!'})
    }
})

/* Deleta um especíico */
router.get('/:id', async (req, res) => {
    try {
        await DadoCalibrador.findByIdAndRemove(req.params.id)

        return res.send()
    } catch (err) {
        return res.status(400).send({error: 'Erro ao deletar objeto!'})
    }
})

/* Listar Todos Diarios*/
router.get('/', async (req, res) => {
    try {
        const diarios = await DadoCalibrador.find()

        return res.send({diarios})
    } catch (err) {
        return res.status(400).send({error: 'Erro ao pegar todos os dados!'})
    }
})

/* Atualizar um diário */
router.put('/update/:id', async (req, res) => {
    try {
        const diario = await DadoCalibrador.findByIdAndUpdate(req.params.id, {new: true})

        return res.send( { diario })
    } catch (err) {
        return res.status(400).send({ error: "Deu ruim!  " + err })
    }
})


/*
router.post('/update/:id', async (req, res) => {
    DadoCalibrador.findById(req.params.id, function(err, dado){
        if (!dado) {
            res.status(404).send('Dado não encontrado')
        } else {
            dado.ajusteZero = req.body.ajusteZero
            dado.data = req.body.data
            dado.bg = req.body.bg
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
*/
module.exports = app => app.use('/curiometro', router)