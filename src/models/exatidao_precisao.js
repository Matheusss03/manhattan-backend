const mongoose = require('../database')

const Schema = mongoose.Schema

const ExatidaoPrecisao = new Schema({
  data: {
      type: Date, 
      default: () => Date.now() - 3*60*60*1000
  },
  hora: {
      type: String,
      default: "00:00"
  },
  selada: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Selada'
  },
  dado: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DadoExatidaoPrecisao'
  }],
  instituicao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instituicao'
  }
})

module.exports = mongoose.model("ExatidaoPrecisao", ExatidaoPrecisao)