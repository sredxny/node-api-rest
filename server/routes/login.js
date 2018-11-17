const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/login',(req, res) =>{
    body = req.body;

    Usuario.findOne({email:body.email},(err, found) =>{
        if (err){
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!found){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o contrasena incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password,found.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o contrasena incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario:found,
        },process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});
        res.json({
            ok: true,
            usuario: found,
            token
        });
    });

});

module.exports = app;