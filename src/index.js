'use strict'
const jwt = require('jsonwebtoken');
exports = module.exports = AUTH

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
        if (typeof opts.Group !== 'undefined') {
            GetterGroup(req, res, next, opts)
        } else {
            Security(req, res, next, opts)
        }
    }
}
function GetterGroup(req, res, next, opts) {
    opts.Group.forEach(e => {
        let UrlTmpGruop = Filter(e.UrlGruop.split("/"))
        let UrlTmp = Filter(req.url.split("/"))
        let count = 0;
        for (let i = 0; i < UrlTmpGruop.length; i++) { if (UrlTmpGruop[i] == UrlTmp[i]) { count++; } }
        if (count == (UrlTmpGruop.length)) { Security(req, res, next, e) }
    });
    return next(new Error("NO SE ENCONTRO LA URL DE GRUPO"))
}

function Filter(array) { return array.filter(function (el) { return el != ""; }); }

function Security(req, res, next, data) {
    if (typeof data.Ignore !== 'undefined') {
        let partUrl = req.url.split("/");
        data.Ignore.forEach(e => {
            if (e.indexOf("?") != -1) {
                let PartUrlTmp = partUrl;
                let tmpUrl = e.split("/");
                while (tmpUrl.indexOf("?") != -1) { tmpUrl[tmpUrl.indexOf("?")] = PartUrlTmp[tmpUrl.indexOf("?")]; }
                if (tmpUrl.join("/") == PartUrlTmp.join("/")) { return next() }
            } else if (e == req.url) { return next() }
        });
    }
    if (typeof data === 'undefined' || typeof data.UrlStart === 'undefined' || typeof data.KEY_TOKEN === 'undefined' || typeof data.NameToken === 'undefined') {
        return next(new Error("FALTAN CAMPOS PARA RELLENAR EN OBJETO COLOCADO EN MIDDLEWARE"))
    } else if (req.url == data.UrlStart) {
        let optsToken = {}
        if (typeof data.EncryptionMethod !== 'undefined') {
            if (VerifyEncryptionMethod(data.EncryptionMethod)) {
                optsToken.algorithm = data.EncryptionMethod;
            } else { next(new Error("ERROR METODO DE ENCRIPTACION NO VALIDO")) }
        }
        if (typeof data.ActiveTime !== 'undefined') { optsToken.expiresIn = data.ActiveTime; }
        req.GenerateToken = (option) => {
            return jwt.sign({ option }, data.KEY_TOKEN, optsToken)
        };
        return next()
    } else {
        const BearerHeader = req.headers[data.NameToken];
        if (typeof BearerHeader !== 'undefined') {
            const bearer = BearerHeader.split(" ");
            const Token = bearer[1];
            jwt.verify(Token, data.KEY_TOKEN, (err, data) => {
                if (err) { res.sendStatus(403); }
                else { return next() }
            })
        } else {
            res.sendStatus(403);
        }
    }
}
function VerifyEncryptionMethod(Method) {
    switch (Method) {
        case "HS256":
            return true;
            break;
        case "HS384":
            return true;
            break;
        case "HS512":
            return true;
            break;
        case "RS256":
            return true;
            break;
        case "RS384":
            return true;
            break;
        case "RS512":
            return true;
            break;
        case "ES256":
            return true;
            break;
        case "ES384":
            return true;
            break;
        case "ES512":
            return true;
            break;
        case "PS256":
            return true;
            break;
        case "PS384":
            return true;
            break;
        case "PS512":
            return true;
            break;
        default:
            return false;
            break;
    }

}