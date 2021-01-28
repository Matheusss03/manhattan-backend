const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect("mongodb+srv://deploy:manhattan123@mongo-manhattan.hjeqi.mongodb.net/manhattan?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(()=>{console.log("Mongobd Conectado...");})
.catch((error)=>{console.log("Houve um erro: " + error)
})

module.exports = mongoose