const express = require('express');
const auth = require('authmiddlewarenodejs')
require("dotenv").config()

const app = express();

const AUTHOptions = {
    UrlStart: "/session",
    Ignore: [
        "/public"
    ],
    ActiveTime: "15m",
    KEY_TOKEN: 'TOKEN_PRIVATE_KEY',
    NameToken: "access-token",
    EncryptionMethod: "HS256"
}
app.use('/api', auth(AUTHOptions))
app.get('/api/session', (req, res) => {
    res.send(req.GenerateToken({ id: 30 }))
})
app.get('/api/holamundo', (req, res) => {
    res.send('hola mundo') // en esta url no pasara porque es afectado por el auth
})
app.get('/public', (req, res) => {
    res.send('hola mundo') // en esta url si pasara porque no es afectado por el auth
})
app.listen(3000, () => { console.log(`http://localhost:3000`) })