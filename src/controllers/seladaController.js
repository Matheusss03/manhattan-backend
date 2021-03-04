const express = require('express')

const Selada = require('../models/selada')

const router = express.Router()

/* Listar Todos Diarios*/
router.get('/todos', async (req, res) => {
    await Selada.find(function(err,dados){
        if(err) res.status(400).send({error: 'Erro ao pegar todos os elementos!!  ' + err})
        else res.json(dados)
    })

})

/* Novo Registro */
router.post('/add', async (req, res) => {
    try {
        const diario = await Selada.create(req.body)

        return res.send( { diario })
    } catch (err) {
        return res.status(400).send({ error: "Deu ruim!  " + err })
    }
})

/* Pega um em específico */
router.get('/:id', async (req, res) => {
    const id = req.params.id

    await Selada.find(id, function(err, dado){
        if(err) res.status(400).send({error: 'Erro ao pegar o elemento'+ id + '  ' + err})
        else res.json(dado)
    })
})

/* Deleta um especíico */
router.get('/delete/:id', async (req, res) => {
    try {
        await Selada.findByIdAndRemove(req.params.id)

        return res.send()
    } catch (err) {
        return res.status(400).send({error: 'Erro ao deletar objeto!  ' + err})
    }
})


router.post('/update/:id', async (req, res) => {
    Selada.findById(req.params.id, function(err, dado){
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

module.exports = app => app.use('/selada', router)