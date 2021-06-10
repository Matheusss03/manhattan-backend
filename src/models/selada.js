const mongoose = require('../database')

const Schema = mongoose.Schema

const Selada = new Schema({
  radionuclideo: {
    type: String,
    enum: ["Co-57", "Ba-133", "Cs-137", "Na-22", "Ge-68"],
    required: true
  },
  fabricante: {
    type: String,
    required: true
  },
  serie: {
    type: String,
    required: true
  },
  numeroCertificado: {
    type: String,
    required: true
  },
  meiaVida: {
    type: Number
  },
  certificadoPDF: {
    data: Buffer,
    contentType: String
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
    collection: 'seladas'
})

module.exports = mongoose.model("Selada", Selada)