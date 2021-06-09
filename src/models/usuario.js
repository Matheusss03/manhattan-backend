const mongoose = require('../database')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const Usuario = new Schema({
  tipo: {
    type: String,
    enum: ["Supervisor de Radioproteção", "Responsável Técnico", "Operador", "Titular", "Físico"],
    required: true
  },
  privilegio: {
    type: String,
    enum: ["SUPER_ADMIN", "ADMIN", "TÉCNICO", "SERVIÇO"],
    default: "SERVIÇO"
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
  instituicoes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instituicao',
    required: function() {
      return this.privilegio !== "SUPER_ADMIN"
  }}],
  dataAgora: {
    type: Date, 
    default: () => Date.now() - 3*60*60*1000
  },
},

{
  collection: 'usuarios'
})

/*
Usuario.pre(
  'save',
  async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);

    this.senha = hash;
    next();
  }
)

Usuario.methods.isValidPassword = async function(senha) {
  const user = this;
  const compare = await bcrypt.compare(senha, user.senha);

  return compare;
}
*/

Usuario.pre('save', async function(next){
  const hash = await bcrypt.hash(this.senha, 10)
  this.senha = hash

  next()
})

Usuario.pre('findByIdAndUpdate', async function(next){
  const hash = await bcrypt.hash(this._update.senha, 10)
  this._update.senha = hash

  next()
})

/*
Usuario.statics.generateHash = function(senha) {
  return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
}

Usuario.methods.validPassword = function(senha) {
  if(this.senha != null) {
    return bcrypt.compareSync(senha, this.senha)
  } else {
    return false
  }
}
*/
Usuario.methods.isSuperAdmin = function() {
  return(this.privilegio === "SUPER_ADMIN")
}

Usuario.methods.isAdmin = function() {
  return(this.privilegio === "ADMIN")
}

Usuario.methods.isTecnico = function() {
  return(this.privilegio === "TÉCNICO")
}

Usuario.methods.isServico = function() {
  return(this.privilegio === "SERVIÇO")
}

module.exports = mongoose.model("Usuario", Usuario)