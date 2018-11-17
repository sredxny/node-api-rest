const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());


app.put('/upload',(req, res) =>{
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length-1];

    let extensionesValidas = ['png','jpg'];

    if (extensionesValidas.indexOf(extension) < 0 ){
        return res.status(400).json({
            ok: false,
            message: 'extension no valida'
        });
    }
    // Use the mv() method to place the file somewhere on your server
    archivo.mv('/uploads/filename.jpg', (err) =>{
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        res.json({
            message: 'success',
            ok: true
        });
    })
});

module.exports = app;