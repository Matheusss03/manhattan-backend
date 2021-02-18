const mongoose = require('../database')

const Schema = mongoose.Schema

const DadoExatidaoPrecisao = new Schema({
  data: {
      type: Date, 
      default: () => Date.now() - 3*60*60*1000
  },
  hora: {
      type: String,
      required: true,
      default: "00:00"
  },
  selada: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Selada',
      required: true
  }
})

module.exports = mongoose.model("DadoExatidaoPrecisao", DadoExatidaoPrecisao)