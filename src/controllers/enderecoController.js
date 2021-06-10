const express = require('express')

const Endereco = require('../models/endereco')

const router = express.Router()


/* Listar Todos Diarios*/
router.get('/todos', async (req, res) => {
    await Endereco.find(function(err,endereco){
        if(err) res.status(400).send({error: 'Erro ao pegar todos os endereços!!  ' + err})
        else res.json(endereco)
    })

})

/* Pega um endereço específico */
router.get('/:id', async (req, res) => {
    await Endereco.findById(req.params.id)
    .then(endereco => res.json(endereco))
    .catch(err => res.status(404).json({datafound: 'Dado não encontrado'}))
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

/* Deleta um endereço */
router.delete('/delete/:id', async (req, res) => {
    try {
        await Endereco.findByIdAndRemove(req.params.id)

        return res.send()
    } catch (err) {
        return res.status(400).send({error: 'Erro ao deletar objeto!  ' + err})
    }
})

/* Atualiza Endereço */
router.put('/update/:id', async (req, res) => {
    await Endereco.findByIdAndUpdate(req.params.id, req.body)
    .then(endereco => res.json(endereco))
    .catch(err => res.status(400).json({ error: 'Erro ao atualizar o banco' }))
})

module.exports = app => app.use('/endereco', router)