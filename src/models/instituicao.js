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
  endereco: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Endereco',
    required: true
  }
},
{
    collection: 'instituicoes'
})

module.exports = mongoose.model("Instituicao", Instituicao)