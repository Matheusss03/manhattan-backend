const mongoose = require('../database')

const Schema = mongoose.Schema

const Endereco = new Schema({
  cep: {
    type: String,
    required: true
  },
  bairro: {
    type: String,
    required: true
  },
  cidade: {
    type: String,
    required: true
  },
  uf: {
    type: String,
    required: true,
    min: 2,
    max: 2
  },
  logradouro: {
    type: String,
    required: true
  },
  complemento: {
    type: String
  },
},

  {
    collection: 'enderecos'
  }
)

module.exports = mongoose.model("Endereco", Endereco)