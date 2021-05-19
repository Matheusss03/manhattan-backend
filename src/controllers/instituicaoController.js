const express = require('express')
const authMiddleware = require('../middlewares/auth')

const Instituicao = require('../models/instituicao')
const Usuario = require('../models/usuario')

const router = express.Router()

router.use(authMiddleware)

// Lista todas as instituições
router.get('/todos', async (req, res) =>{
    try {
        const instituicoes = await Instituicao.find().populate('usuario')

        return res.send({ instituicoes })
    } catch (err) {
        return res.status(400).send({ error:'Erro ao pegar todas instituições!!  ' + err })
    }
})

// Remove uma instituição
router.delete('/:id', async (req, res) => {
    try {
        await Instituicao.findByIdAndRemove(req.params.id)

        return res.send()
    } catch (err) {
        return res.status(400).send({ error:'Erro ao apagar uma instituição!!  ' + err })
    }
})

// Cadastra uma instituição
router.post('/add', async (req, res) =>{
    try {
        const {nome, cnpj, cnen, telefone, email, endereco, usuario} = req.body

        const instituicao = await Instituicao.create({ nome, 
            cnpj, 
            cnen, 
            telefone, 
            email, 
            endereco, 
            usuario: req.userId 
        })

        await Promise.all(usuario.map(async usuario => {
            const usuarioInstituicao = new Usuario({ ...usuario, instituicao: instituicao._id })

            await usuarioInstituicao.save()

            instituicao.usuario.push(usuarioInstituicao)
        }))

        await instituicao.save()

        return res.send({ instituicao })
    } catch (err) {
        return res.status(400).send({ error:'Erro ao cadastrar uma instituição!!  ' + err })
    }
})

module.exports = app => app.use('/instituicao', router)