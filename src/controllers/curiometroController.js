const express = require('express')

const DadoCalibrador = require('../models/dado_calibrador')

const router = express.Router()

/* Novo Registro */
router.post('/add', (req, res) => {
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

module.exports = app => app.use('/curiometro', router)