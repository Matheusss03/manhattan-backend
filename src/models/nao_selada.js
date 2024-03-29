const mongoose = require('../database')

const Schema = mongoose.Schema

const NaoSelada = new Schema({
  radionuclideo: {
    type: String,
    enum: ["Tc-99m", "I-131", "Ga-67", "F-18", "Ga-68"],
    required: true
  },
  meiaVida: {
    type: Number
  },
  unidadeTempo: {
    type: String,
    enum: ["anos", "dias"]
  },
  atividade: {
    type: Number,
    required: true
  },
  unidadeMedida: {
    type: String,
    required: true,
    enum: ["mCi","µCi","kBq","MBq"]
  },
  instituicao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instituicao'
  },
  dataCalibracao: {
    type: Date, 
    default: () => Date.now() - 3*60*60*1000
  }
},
{
    collection: 'nao_seladas'
})


module.exports = mongoose.model("NaoSelada", NaoSelada)