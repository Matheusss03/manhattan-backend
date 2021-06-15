const express = require('express')

const NaoSelada = require('../models/nao_selada')

const router = express.Router()

/* Listar Todas Fontes NaoSeladas*/
router.post('/add', async (req, res) => {
  try {
      const fonte_nao_selada = await NaoSelada.create(req.body)

      return res.send( { fonte_nao_selada })
  } catch (err) {
      return res.status(400).send({ error: "Deu ruim!  " + err })
  }
})

/* Nova Fonte */
router.post('/add', async (req, res) => {
    await NaoSelada.create(req.body)
      .then(Naoselada => res.json({ msg: 'Fonte não selada adicionada com sucesso' }))
      .catch(err => res.status(400).json({ error: 'Fonte não selada não adicionada ' + err }));
});

/* Pega uma em específico */
router.get('/:id', async (req, res) => {
    await NaoSelada.findById(req.params.id)
      .then(Naoselada => res.json(Naoselada))
      .catch(err => res.status(404).json({ nobookfound: 'Fonte não selada não encontrada' }));
});

/* Deleta uma fonte especíica */
router.delete('/delete/:id', async (req, res) => {
    await NaoSelada.findByIdAndRemove(req.params.id, req.body)
      .then(Naoselada => res.json({ mgs: 'Fonte não selada deletada com sucesso' }))
      .catch(err => res.status(404).json({ error: 'Fonte não selada não deletada' }));
});

/* Atualiza uma fonte Naoselada */
router.put('/update/:id', async (req, res) => {
    await NaoSelada.findByIdAndUpdate(req.params.id, req.body)
      .then(Naoselada => res.json({ msg: 'Atualizada com sucesso' }))
      .catch(err =>
        res.status(400).json({ error: 'Não foi possível atualizar o banco de dados' })
      );
});

module.exports = app => app.use('/naoSelada', router)