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
  atividade: {
    type: Number,
    required: true
  },
  unidadeMedida: {
    type: String,
    required: true,
    enum: ["mCi","µCi","kBq","MBq"]
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