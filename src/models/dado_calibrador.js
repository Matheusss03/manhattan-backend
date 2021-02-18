const mongoose = require('../database')

const Schema = mongoose.Schema

const DadoCalibrador = new Schema({
  ajusteZero: {
    type: String,
    default: "N/A",
    required: true
  },
  data: {
    type: Date, 
    default: () => Date.now() - 3*60*60*1000
  },
  altaTensao: {
    type: String,
    default: "N/A"
  },
  bg: {
    type: String,
    default: "N/A"
  },
  cheio: {
    type: String,
    default: "N/A"
  },
  vazio: {
    type: String,
    default: "N/A"
  },
  bario: {
    type: String,
    default: "N/A"
  },
  cesio: {
    type: String,
    default: "N/A"
  },
  cobalto: {
    type: String,
    default: "N/A"
  },
  medidaCobalto: {
    type: String,
    enum: ["µCi", "mCi"],
    default: 'mCi'
  }
},

{
  collection: 'dado_calibrador'
})

module.exports = mongoose.model("DadoCalibrador", DadoCalibrador)