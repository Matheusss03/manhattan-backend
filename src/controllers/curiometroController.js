const express = require('express')

const DadoCalibrador = require('../models/dado_calibrador')

const router = express.Router()

/* Novo Registro */
router.post('/add', async (req, res) => {
    try {
        const diario = new DadoCalibrador
    (req.body)
        diario.save()

        return res.send( { 
            diario
        })
    } catch (err) {
        return res.status(400).send({ error: "Deu ruim!  " + err })
    }
})

/* Listar Todos Diarios*/
router.get('/todos', async (req, res) => {
    DadoCalibrador
.find(function(err, diarios){
        if (err) console.log(err) 
        else res.json(diarios)
    })
})

/* Atualizar um diário */
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

module.exports = app => app.use('/curiometro', router)