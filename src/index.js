const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.get('/', (req, res) => {
    return res.json({
        message: "API do sistema Manhattan."
    });
})

app.use(session({
    secret: 'AlgoQueVoceNaoDeveriaSaber',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://deploy:manhattan123@mongo-manhattan.hjeqi.mongodb.net/manhattan?retryWrites=true&w=majority",
        ttl: 1 * 24 * 60 * 60
    })
}))

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

require('./controllers/authController')(app)
require('./controllers/usuarioController')(app)
require('./controllers/curiometroController')(app)
require('./controllers/seladaController')(app)
require('./controllers/instituicaoController')(app)
require('./controllers/enderecoController')(app)

app.listen(process.env.PORT || 8000)