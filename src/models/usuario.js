const mongoose = require('../database')

const Schema = mongoose.Schema

const Usuario = new Schema({
  /*tipo: {
    type: String,
    enum: ["Supervisor de Radioproteção", "Responsável Técnico", "Operador", "Titular"],
    required: true
  },*/
  nome: {
    type: String,
    min: 5,
    max: 45,
    required: true
  },
  cpf: {
    type: String,
    min: [11, "Valor inválido."],
    unique: true,
    max: 11,
    required: true
  }/*,
  cnen: {
    type: String,
    min: 4,
    max: 4,
    required: function() {
      return this.tipo == "Supervisor de Radioproteção" | "Responsável Técnico";
    }
  },
  celular: {
    type: String,
    min: 11,
    max: 11
  },
  email: {
    type: String,
    required: true
  },
  conselho: {
    type: String,
    enum: ["CRM","CRF","COREN","CRBM"]
  },
  dataAgora: {
    type: Date,
    default: Date.now
  }*/
})

module.exports = mongoose.model("Usuario", Usuario)