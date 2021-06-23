const mongoose = require('../database')

const Schema = mongoose.Schema

const DadoCalibrador = new Schema({
  ajusteZero: {
    type: Number,
    required: true
  },
  data: {
    type: Date, 
    default: () => Date.now() - 3*60*60*1000
  },
  altaTensao: {
    type: Number
  },
  bg: {
    type: Number
  },
  cheio: {
    type: Number
  },
  vazio: {
    type: Number
  },
  bario: {
    type: Number
  },
  cesio: {
    type: Number
  },
  cobalto: {
    type: Number
  },
  medidaCobalto: {
    type: String,
    enum: ["µCi", "mCi"],
    default: 'mCi'
  },
  aceite: {
    type: Boolean,
    default: false
  },
  instrumento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instrumento'
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
},

{
  collection: 'dado_calibrador'
})

module.exports = mongoose.model("DadoCalibrador", DadoCalibrador)