const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es requerido']
    },
    email: {
         type: String,
         unique: true,
         required: [true,'El correo es necesario']
    },
    password: {
        type: String,
        required: [true,'El password es necesario']
    },
    img: {
        type: String,
        required: false
    },//no obligatoria
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles,
    }, //default: USER_ROLE
    estado: {
        type: Boolean,
        default: true
    }, //boolean
    google: {
        type: Boolean,
        default: false
    }, //bolean
});

usuarioSchema.methods.toJSON= function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Usuario',usuarioSchema);