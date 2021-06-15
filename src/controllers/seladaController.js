const express = require('express')

const Selada = require('../models/selada')

const router = express.Router()

/* Listar Todas Fontes Seladas*/
router.get('/todos', async (req, res) => {
    await Selada.find()
      .then(selada => res.json(selada))
      .catch(err => res.status(404).json({ nobooksfound: 'Fontes seladas não encontradas' }));
});

/* Nova Fonte */
router.post('/add', async (req, res) => {
  try {
      const fonte_selada = await Selada.create(req.body)

      return res.send( { fonte_selada })
  } catch (err) {
      return res.status(400).send({ error: "Deu ruim!  " + err })
  }
})

/* Pega uma em específico */
router.get('/:id', async (req, res) => {
    await Selada.findById(req.params.id)
      .then(selada => res.json(selada))
      .catch(err => res.status(404).json({ nobookfound: 'Fonte Selada não encontrada' }));
});

/* Deleta uma fonte especíica */
router.delete('/delete/:id', async (req, res) => {
    await Selada.findByIdAndRemove(req.params.id, req.body)
      .then(selada => res.json({ mgs: 'Fonte Selada deletada com sucesso' }))
      .catch(err => res.status(404).json({ error: 'Fonte selada não deletada' }));
});

/* Atualiza uma fonte selada */
router.put('/update/:id', async (req, res) => {
    await Selada.findByIdAndUpdate(req.params.id, req.body)
      .then(selada => res.json({ msg: 'Atualizada com sucesso' }))
      .catch(err =>
        res.status(400).json({ error: 'Não foi possível atualizar o banco de dados' })
      );
});

module.exports = app => app.use('/selada', router)