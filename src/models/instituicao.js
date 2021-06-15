const mongoose = require('../database')

const Schema = mongoose.Schema

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
}

const Instituicao = new Schema({
  nome: {
    type: String,
    min: 5,
    max: 80,
    required: true
  },
  cnpj: {
    type: String,
    min: [14, "Valor inválido."],
    unique: true,
    max: 14,
    required: true
  },
  cnen: {
    type: String,
    min: 4,
    max: 6,
  },
  telefone: {
    type: String,
    min: 10,
    max: 11
  },
  email: {
    type: String,
    required: "Insira um endereço de email.",
    trim: true,
    validate: [validateEmail, "Por favor, insira um email válido!"],
    unique: true,
    lowercase: true
  },
  razao: {
    type: String,
    min: 5,
    max: 80,
    required: true
  },
  grupo: {
    type: String
  },
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
  fonte_selada: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Selada'
  }],
  fonte_nao_selada: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NaoSelada'
  }],
  instrumento: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instrumento'
  }],
  exatidao_precisao: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExatidaoPrecisao'
  }],
  geometria: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Geometria'
  }],
  linearidade: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Linearidade'
  }],
  calibrador: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calibrador'
  }],
  usuario: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
},
{
    collection: 'instituicoes'
})

module.exports = mongoose.model("Instituicao", Instituicao)