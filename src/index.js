const express = require('express');

const app = express();
app.use(express.json());

/*
app.get('/', (req, res) => {
    res.send('Tudo Ok!')
})
*/

require("./controllers/authController")(app)

app.listen(3000)