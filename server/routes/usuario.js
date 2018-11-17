const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const {verificaToken} = require('../middlewares/auth');

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/usuario',verificaToken,  function (req, res) {

    //paginacion
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let hasta = req.query.hasta || 5;
    hasta = Number(hasta);
    //Para un select:
    //Usuario.find({},'nombre estado img role ')
    Usuario.find({})
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios) => {
            if (err){
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({},(err, conteo) =>{
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });

        });
});

app.post('/usuario', function (req, res) {

    let body = req.body;
    let usuario = new Usuario({
        nombre : body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role,
    });

    usuario.save((err,usuarioDB)=>{
        if (err){
            res.status(400).json({
                ok: false,
                err
            });
        }else{
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
/*    if (body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'Debes proveer un nombre'
        });
    }else{
        res.json({
            persona: body
        });
    }
*/
});

app.get('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body;


});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);

    //delete body.password may work
    Usuario.findByIdAndUpdate(id, body,{new: true,runValidators: true}, (err, usuarioDB) =>{
        if (err){
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, removedUser) =>{
        if (err){
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (removedUser === null){
            res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no existe'
                }
            });
        }

        res.json({
            ok: true,
            usuario: removedUser
        });
    });
});

module.exports = app;