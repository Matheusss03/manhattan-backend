const mongoose = require('../database')

const Schema = mongoose.Schema

const Curiometro = new Schema({
  ajusteZero: {
    type: String,
  },
  dataAjusteZero: {
    type: Date, 
    default: () => Date.now() - 3*60*60*1000
  },
  altaTensao: {
    type: String,
  },
  dataAltaTensao: {
    type: Date, 
    default: () => Date.now() - 3*60*60*1000
  },
  bario: {
    type: String,
  },
  cesio: {
    type: String,
  },
  cobalto: {
    type: String,
  },
  dataRepetibilidade: {
    type: Date, 
    default: () => Date.now() - 3*60*60*1000
  }
},

{
  collection: 'curiometro'
})

module.exports = mongoose.model("Curiometro", Curiometro)