'use strict'
const jwt = require('jsonwebtoken');
exports = module.exports =  AUTH

function AUTH(options) {
    var opts = {}
    if (options) {
        for (var prop in options) {
            if (prop !== 'type') {
                opts[prop] = options[prop]
            }
        }
    }
    return function AUTH(req, res, next) {
        Security(req,res,next,opts)
    }
}

function Security(req,res,next,data){
    console.log(data.KEY_TOKEN)
    if (typeof data !== 'undefined' || typeof data.UrlStart !== 'undefined' || typeof data.ActiveTime !== 'undefined' || typeof data.KEY_TOKEN !== 'undefined') {
       next(new Error("FALTAN CAMPOS PARA RELLENAR EN OBJETO COLOCADO EN MIDDLEWARE"))
    }else if (req.url == data.UrlStart) {
        req.GenerateToken = (option) => {
            return jwt.sign({ option }, data.KEY_TOKEN, { expiresIn: data.ActiveTime })
        };
        next()
    } else {
        const BearerHeader = req.headers["auth_token"];
        if (typeof BearerHeader !== 'undefined') {
            const bearer = BearerHeader.split(" ");
            const Token = bearer[1];
            jwt.verify(Token, data.KEY_TOKEN, (err, data) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    next()
                }
            })
        } else {
            res.sendStatus(403);
        }
    }
}