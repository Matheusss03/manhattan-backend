const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const Usuario = new Schema({
  tipo: {
    type: String,
    enum: ["Supervisor de Radioproteção", "Responsável Técnico", "Operador", "Titular"],
    required: true
  },
  nome: {
    type: String,
    min: 5,
    max: 60,
    required: true
  },
  cpf: {
    type: String,
    min: [11, "Valor inválido."],
    unique: true,
    max: 11,
    required: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
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
    max: 11,
    required: true
  },
  email: {
    type: String,
    required: "Insira um endereço de email.",
    trim: true,
    validate: [validateEmail, "Por favor, insira um email válido!"],
    unique: true,
    lowercase: true
  },
  conselho: {
    type: String,
    enum: ["CRM","CRF","COREN","CRBM"]
  },
  dataAgora: {
    type: Date, 
    default: () => Date.now() - 3*60*60*1000
  },
},

{
  collection: 'usuarios'
})


Usuario.pre('save', async function(next){
  const hash = await bcrypt.hash(this.senha, 10)
  this.senha = hash

  next()
})

module.exports = mongoose.model("Usuario", Usuario)