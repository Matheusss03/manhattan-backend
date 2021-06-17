const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', (req, res) => {
    return res.json({
        message: "API do sistema Manhattan."
    });
})

require('./controllers/authController')(app)
require('./controllers/usuarioController')(app)
require('./controllers/curiometroController')(app)
require('./controllers/seladaController')(app)
require('./controllers/instituicaoController')(app)
require('./controllers/naoSeladaController')(app)
require('./controllers/instrumentoController')(app)

app.listen(process.env.PORT || 8000)