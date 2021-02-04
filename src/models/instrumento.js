const mongoose = require('../database');
const { collection } = require('./usuario');

const Schema = mongoose.Schema

const Instrumento = new Schema({
  maquina: {
    type: String,
    enum: ["Medidor de Atividade", "Detector GM", "Gama-Câmara", 
            "Gama-Câmara SPECT", "Gama-Câmara SPECT/CT", "PET/CT",
            "Gama Probe", "Captador"],
    required: true
  },
  fabricante: {
    type: String,
    min: 2,
    max: 40,
    required: true
  },
  modelo: {
    type: String,
    min: 2,
    max: 40,
    required: true
  },
  serie: {
    type: String,
    min: 2,
    max: 25,
    required: true
  },
  cnen: {
    type: String,
    min: 2,
    max: 25,
    required: function() {
      return this.tipo === "Detector GM";
    }
  }
},
{
    collection: 'instrumentos'
})

module.exports = mongoose.model("Instrumento", Instrumento)